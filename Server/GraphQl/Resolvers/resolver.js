import Country from "../../Models/countryModel.js";
import CountryStats from "../../Models/country_statsModel.js";
import Matches from "../../Models/matchesModel.js";
import PlayerGoals from "../../Models/playerGoalsModel.js";
const resolvers = {
  Query: {
    getCountry: async (_, args) => {
      const name = args.name;
      return await Country.findAll({ where: { display_name: name } });
    },
    getCountryStats: async () => {
      return await CountryStats.findAll();
    },
    getAllCountries: async () => {
      const allCountries = await Country.findAll();
      const countriesToReturn = allCountries.map((c) => ({
        countryId: c.country_id,
        countryName: c.display_name,
      }));
      return { countries: countriesToReturn };
    },
    getCountryStatsPerYear: async (_, { countryId }) => {
      const result = await CountryStats.findAll({
        where: { country_id: countryId },
        order: [["match_year", "ASC"]],
      });

      const years = result.map((row) => ({
        yearDate: row.match_year,
        generalStats: {
          wins: row.wins,
          losses: row.losses,
          draws: row.draws,
        },
        homeStats: {
          wins: row.home_wins,
          losses: row.home_losses,
          draws: row.home_draws,
        },
        awayStats: {
          wins: row.away_wins,
          losses: row.away_losses,
          draws: row.away_draws,
        },
      }));

      return { years };
    },
    getAllMatchesByCountryId: async (_, { countryId }) => {
      const result = await Matches.findAll({
        where: { home_team_country_id: countryId },
        order: [["match_date", "ASC"]],
      });

      const countryInformationMapped = async (countryId) => {
        const mappedCountry = await Country.findOne({
          where: { country_id: countryId },
        });

        return {
          displayName: mappedCountry.display_name,
          regionName: mappedCountry.region_name,
          status: mappedCountry.status,
          developedStatus: mappedCountry.developed_status,
        };
      };

      const matches = await Promise.all(
        result.map(async (row) => {
          const homeTeam = await countryInformationMapped(
            row.home_team_country_id
          );
          const awayTeam = await countryInformationMapped(
            row.away_team_country_id
          );

          return {
            matchDate: row.match_date,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            homeScore: row.home_score,
            awayScore: row.away_score,
            tournament: row.tournament,
            city: row.city,
            country: row.country,
          };
        })
      );

      return { matches };
    },
    getAllMatchesPerYearWithDetails: async (_, { year }) => {
      const matches = await Matches.findAll({
        where: {
          year: year,
        },
        order: [["match_date", "ASC"]],
      });

      const countryInformationMapped = async (countryId) => {
        const country = await Country.findOne({
          where: { country_id: countryId },
        });

        return {
          displayName: country.display_name,
          regionName: country.region_name,
          status: country.status,
          developedStatus: country.developed_status,
        };
      };

      const result = await Promise.all(
        matches.map(async (match) => {
          const homeTeam = await countryInformationMapped(
            match.home_team_country_id
          );
          const awayTeam = await countryInformationMapped(
            match.away_team_country_id
          );

          return {
            matchDate: match.match_date,
            homeTeam,
            awayTeam,
            homeScore: match.home_score,
            awayScore: match.away_score,
            tournament: match.tournament,
            city: match.city,
            country: match.country,
          };
        })
      );

      return { matches: result };
    },

    getMatchStatsPerYear: async (_, { year }) => {
      // fetch all matches for the given year
      const matches = await Matches.findAll({
        where: { year: year },
        raw: true,
      });
      const matchesNumber = matches.length;
      // helper to sum a boolean flag
      const sumFlag = (flag) =>
        matches.reduce((acc, m) => acc + (m[flag] ? 1 : 0), 0);

      const matchesWithShootouts = sumFlag("had_shootout");
      const draws = sumFlag("draw");
      const neutralMatches = sumFlag("neutral");

      return {
        matchesNumber,
        matchesWithShootouts,
        draws,
        friendlyMatches: neutralMatches,
      };
    },
    getAllCountriesStatsPerYear: async (_, { year }) => {
      // Βρες όλα τα countryStats για το δοσμένο έτος
      const allStats = await CountryStats.findAll({
        where: { match_year: year },
        order: [["country_id", "ASC"]],
      });

      // Ομαδοποίηση κατά country_id
      const groupedByCountry = {};
      for (const row of allStats) {
        const cid = row.country_id;
        if (!groupedByCountry[cid]) {
          groupedByCountry[cid] = [];
        }
        groupedByCountry[cid].push(row);
      }

      // Δημιουργία τελικής λίστας
      const countriesStats = await Promise.all(
        Object.entries(groupedByCountry).map(async ([countryId, rows]) => {
          const country = await Country.findOne({
            where: { country_id: countryId },
          });

          // Υπολογισμός αθροιστικών στατιστικών (σε περίπτωση πολλών εγγραφών)
          const sumField = (field) =>
            rows.reduce((acc, row) => acc + (row[field] || 0), 0);

          return {
            countryDetails: {
              regionName: country.region_name,
              status: country.status,
              developedStatus: country.developed_status,
              displayName: country.display_name,
            },
            generalStats: {
              wins: sumField("wins"),
              losses: sumField("losses"),
              draws: sumField("draws"),
            },
            homeStats: {
              wins: sumField("home_wins"),
              losses: sumField("home_losses"),
              draws: sumField("home_draws"),
            },
            awayStats: {
              wins: sumField("away_wins"),
              losses: sumField("away_losses"),
              draws: sumField("away_draws"),
            },
          };
        })
      );

      return { countriesStats };
    },
    getAllYearsRegistered: async () => {
      const years = await CountryStats.findAll({
        attributes: ["match_year"],
        group: ["match_year"],
        order: [["match_year", "ASC"]],
        raw: true,
      });
      const matchYears = years.map((y) => y.match_year);
      return { years: matchYears };
    },
    getGlobalScoringStats: async () => {
      const allStats = await CountryStats.findAll({ raw: true });

      // Ομαδοποίηση ανά country_id
      const grouped = {};
      for (const row of allStats) {
        const cid = row.country_id;
        if (!grouped[cid]) {
          grouped[cid] = [];
        }
        grouped[cid].push(row);
      }

      // Επεξεργασία ανά χώρα
      const result = await Promise.all(
        Object.entries(grouped).map(async ([countryId, stats]) => {
          const country = await Country.findOne({
            where: { country_id: countryId },
          });

          const years = new Set();
          let totalWins = 0;
          let totalDraws = 0;

          stats.forEach((stat) => {
            years.add(stat.match_year);
            totalWins += stat.wins || 0;
            totalDraws += stat.draws || 0;
          });

          const numberOfYears = years.size;
          const score = totalWins * 3 + totalDraws;
          const averageWinsPerYear =
            numberOfYears > 0 ? totalWins / numberOfYears : 0;
          const averageScorePerYear =
            numberOfYears > 0 ? score / numberOfYears : 0;

          return {
            countryDetails: {
              displayName: country.display_name,
              regionName: country.region_name,
              status: country.status,
              developedStatus: country.developed_status,
              population: country.population,
            },
            totalWins,
            totalDraws,
            score,
            averageWinsPerYear,
            averageScorePerYear,
          };
        })
      );

      return { scoringStats: result };
    },
    getScorerStatsById: async (_, { scorerId }) => {
      // Βρες την εγγραφή με το συγκεκριμένο id
      const base = await PlayerGoals.findOne({
        where: { player_id: scorerId },
        raw: true,
      });
      if (!base) return null;

      // Πάρε όλες τις εγγραφές αυτού του παίκτη (με ίδιο name + team_id)
      const allRecords = await PlayerGoals.findAll({
        where: {
          player_name: base.player_name,
          team_id: base.team_id,
        },
        raw: true,
      });

      // Ομαδοποίηση goals ανά έτος
      const yearStats = {};
      let mostGoalsScored = 0;

      for (const row of allRecords) {
        const year = row.year;
        const goals = row.goals || 0;
        mostGoalsScored = Math.max(mostGoalsScored, goals);
        if (!yearStats[year]) {
          yearStats[year] = { totalGoals: 0 };
        }
        yearStats[year].totalGoals += goals;
      }

      // Εύρεση στοιχείων χώρας
      const country = await Country.findOne({
        where: { country_id: base.team_id },
      });

      const statsByYear = await Promise.all(
        Object.entries(yearStats).map(async ([year, stat]) => {
          const row = await CountryStats.findOne({
            where: {
              country_id: base.team_id,
              match_year: year,
            },
          });

          const teamTotalMatches =
            row &&
            typeof row.wins === "number" &&
            typeof row.draws === "number" &&
            typeof row.losses === "number"
              ? row.wins + row.draws + row.losses
              : 0;

          return {
            year: parseInt(year),
            totalGoals: stat.totalGoals,
            teamTotalMatches,
          };
        })
      );

      return {
        scorerId: base.player_id,
        scorerName: base.player_name,
        teamDetails: {
          displayName: country?.display_name || "Unknown",
          regionName: country?.region_name || "Unknown",
          status: country?.status || "Unknown",
          developedStatus: country?.developed_status || "Unknown",
        },
        mostGoalsScored,
        statsByYear,
      };
    },
    getAllScorers: async () => {
      const allRecords = await PlayerGoals.findAll({ raw: true });
      const scorersToReturn = allRecords.map((c) => ({
        scorerId: c.player_id,
        scorerName: c.player_name,
      }));
      return { scorers: scorersToReturn };
    },
  },
};

export default resolvers;
