import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllScorersIdname = {
  __typename?: 'AllScorersIDNAME';
  scorers?: Maybe<Array<ScorerIdname>>;
};

export type CountriesIdname = {
  __typename?: 'CountriesIDNAME';
  countries?: Maybe<Array<CountryIdNameCombination>>;
};

export type CountriesStatsPerYear = {
  __typename?: 'CountriesStatsPerYear';
  countriesStats?: Maybe<Array<Maybe<CountryStats>>>;
};

export type Country = {
  __typename?: 'Country';
  country_id: Scalars['Int']['output'];
  developed_status?: Maybe<Scalars['String']['output']>;
  display_name: Scalars['String']['output'];
  iso3_code: Scalars['String']['output'];
  iso_code: Scalars['String']['output'];
  population?: Maybe<Scalars['Int']['output']>;
  region_name?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type CountryIdNameCombination = {
  __typename?: 'CountryIdNameCombination';
  countryId: Scalars['Int']['output'];
  countryName: Scalars['String']['output'];
};

export type CountryScoringStats = {
  __typename?: 'CountryScoringStats';
  averageScorePerYear: Scalars['Float']['output'];
  averageWinsPerYear: Scalars['Float']['output'];
  countryDetails: Team;
  score: Scalars['Int']['output'];
  totalWins: Scalars['Int']['output'];
};

export type CountryStats = {
  __typename?: 'CountryStats';
  away_draws?: Maybe<Scalars['Int']['output']>;
  away_losses?: Maybe<Scalars['Int']['output']>;
  away_wins?: Maybe<Scalars['Int']['output']>;
  country_id: Scalars['Int']['output'];
  country_name?: Maybe<Scalars['String']['output']>;
  country_stat_id: Scalars['Int']['output'];
  draws?: Maybe<Scalars['Int']['output']>;
  home_draws?: Maybe<Scalars['Int']['output']>;
  home_losses?: Maybe<Scalars['Int']['output']>;
  home_wins?: Maybe<Scalars['Int']['output']>;
  losses?: Maybe<Scalars['Int']['output']>;
  match_year?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

export type CountryStatsPerYear = {
  __typename?: 'CountryStatsPerYear';
  years?: Maybe<Array<Maybe<GeneralCountryYearStats>>>;
};

export type CountryWldStats = {
  __typename?: 'CountryWLDStats';
  draws: Scalars['Int']['output'];
  losses: Scalars['Int']['output'];
  wins: Scalars['Int']['output'];
};

export type GeneralCountryYearStats = {
  __typename?: 'GeneralCountryYearStats';
  awayStats?: Maybe<CountryWldStats>;
  generalStats?: Maybe<CountryWldStats>;
  homeStats?: Maybe<CountryWldStats>;
  yearDate?: Maybe<Scalars['String']['output']>;
};

export type GlobalScoringStats = {
  __typename?: 'GlobalScoringStats';
  scoringStats?: Maybe<Array<Maybe<CountryScoringStats>>>;
};

export type MatchStatsPerYear = {
  __typename?: 'MatchStatsPerYear';
  draws?: Maybe<Scalars['Int']['output']>;
  friendlyMatches?: Maybe<Scalars['Int']['output']>;
  matchesNumber?: Maybe<Scalars['Int']['output']>;
  matchesWithShootouts?: Maybe<Scalars['Int']['output']>;
};

export type Matches = {
  __typename?: 'Matches';
  awayScore: Scalars['Int']['output'];
  awayTeam: Team;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  homeScore: Scalars['Int']['output'];
  homeTeam: Team;
  matchDate: Scalars['String']['output'];
  tournament: Scalars['String']['output'];
};

export type MatchesByCountryId = {
  __typename?: 'MatchesByCountryId';
  matches?: Maybe<Array<Maybe<Matches>>>;
};

export type Query = {
  __typename?: 'Query';
  getAllCountries: CountriesIdname;
  getAllCountriesStatsPerYear: CountriesStatsPerYear;
  getAllMatchesByCountryId: MatchesByCountryId;
  getAllMatchesPerYearWithDetails: MatchesByCountryId;
  getAllScorers: AllScorersIdname;
  getAllYearsRegistered: Years;
  getCountry: Array<Country>;
  getCountryStats: Array<CountryStats>;
  getCountryStatsPerYear: CountryStatsPerYear;
  getGlobalScoringStats: GlobalScoringStats;
  getMatchStatsPerYear: MatchStatsPerYear;
  getScorerStatsById: ScorerStats;
};


export type QueryGetAllCountriesStatsPerYearArgs = {
  year: Scalars['Int']['input'];
};


export type QueryGetAllMatchesByCountryIdArgs = {
  countryId: Scalars['Int']['input'];
};


export type QueryGetAllMatchesPerYearWithDetailsArgs = {
  year: Scalars['Int']['input'];
};


export type QueryGetCountryArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetCountryStatsPerYearArgs = {
  countryId: Scalars['Int']['input'];
};


export type QueryGetMatchStatsPerYearArgs = {
  year: Scalars['Int']['input'];
};


export type QueryGetScorerStatsByIdArgs = {
  scorerId: Scalars['Int']['input'];
};

export type ScorerIdname = {
  __typename?: 'ScorerIDNAME';
  scorerId: Scalars['Int']['output'];
  scorerName: Scalars['String']['output'];
};

export type ScorerStats = {
  __typename?: 'ScorerStats';
  mostGoalsScored: Scalars['Int']['output'];
  scorerId?: Maybe<Scalars['Int']['output']>;
  scorerName: Scalars['String']['output'];
  statsByYear: Array<ScorerStatsByYear>;
  teamDetails: Team;
};

export type ScorerStatsByYear = {
  __typename?: 'ScorerStatsByYear';
  teamTotalMatches: Scalars['Int']['output'];
  totalGoals: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type Team = {
  __typename?: 'Team';
  developedStatus: Scalars['String']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Int']['output']>;
  regionName: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Years = {
  __typename?: 'Years';
  years?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CountryStats = {
  __typename?: 'countryStats';
  awayStats: CountryWldStats;
  countryDetails: Team;
  generalStats: CountryWldStats;
  homeStats: CountryWldStats;
};

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = { __typename?: 'Query', getAllCountries: { __typename?: 'CountriesIDNAME', countries?: Array<{ __typename?: 'CountryIdNameCombination', countryId: number, countryName: string }> | null } };

export type GetAllCountriesStatsPerYearQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetAllCountriesStatsPerYearQuery = { __typename?: 'Query', getAllCountriesStatsPerYear: { __typename?: 'CountriesStatsPerYear', countriesStats?: Array<{ __typename?: 'countryStats', countryDetails: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null }, generalStats: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number }, homeStats: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number }, awayStats: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number } } | null> | null } };

export type GetAllMatchesByCountryIdQueryVariables = Exact<{
  countryId: Scalars['Int']['input'];
}>;


export type GetAllMatchesByCountryIdQuery = { __typename?: 'Query', getAllMatchesByCountryId: { __typename?: 'MatchesByCountryId', matches?: Array<{ __typename?: 'Matches', matchDate: string, homeScore: number, awayScore: number, tournament: string, city: string, country: string, homeTeam: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null }, awayTeam: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null } } | null> | null } };

export type GetAllMatchesPerYearWithDetailsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetAllMatchesPerYearWithDetailsQuery = { __typename?: 'Query', getAllMatchesPerYearWithDetails: { __typename?: 'MatchesByCountryId', matches?: Array<{ __typename?: 'Matches', matchDate: string, homeScore: number, awayScore: number, tournament: string, city: string, country: string, homeTeam: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null }, awayTeam: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null } } | null> | null } };

export type GetAllScorersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScorersQuery = { __typename?: 'Query', getAllScorers: { __typename?: 'AllScorersIDNAME', scorers?: Array<{ __typename?: 'ScorerIDNAME', scorerId: number, scorerName: string }> | null } };

export type GetAllYearsRegisteredQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllYearsRegisteredQuery = { __typename?: 'Query', getAllYearsRegistered: { __typename?: 'Years', years?: Array<string | null> | null } };

export type GetCountryStatsPerYearQueryVariables = Exact<{
  countryId: Scalars['Int']['input'];
}>;


export type GetCountryStatsPerYearQuery = { __typename?: 'Query', getCountryStatsPerYear: { __typename?: 'CountryStatsPerYear', years?: Array<{ __typename?: 'GeneralCountryYearStats', yearDate?: string | null, generalStats?: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number } | null, homeStats?: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number } | null, awayStats?: { __typename?: 'CountryWLDStats', wins: number, losses: number, draws: number } | null } | null> | null } };

export type GetGlobalScoringStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalScoringStatsQuery = { __typename?: 'Query', getGlobalScoringStats: { __typename?: 'GlobalScoringStats', scoringStats?: Array<{ __typename?: 'CountryScoringStats', totalWins: number, score: number, averageWinsPerYear: number, averageScorePerYear: number, countryDetails: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null } } | null> | null } };

export type GetMatchStatsPerYearQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetMatchStatsPerYearQuery = { __typename?: 'Query', getMatchStatsPerYear: { __typename?: 'MatchStatsPerYear', matchesNumber?: number | null, matchesWithShootouts?: number | null, draws?: number | null, friendlyMatches?: number | null } };

export type GetScorerStatsByIdQueryVariables = Exact<{
  scorerId: Scalars['Int']['input'];
}>;


export type GetScorerStatsByIdQuery = { __typename?: 'Query', getScorerStatsById: { __typename?: 'ScorerStats', scorerId?: number | null, scorerName: string, mostGoalsScored: number, teamDetails: { __typename?: 'Team', regionName: string, status: string, developedStatus: string, displayName?: string | null, population?: number | null }, statsByYear: Array<{ __typename?: 'ScorerStatsByYear', year: number, totalGoals: number, teamTotalMatches: number }> } };


export const GetAllCountriesDocument = gql`
    query getAllCountries {
  getAllCountries {
    countries {
      countryId
      countryName
    }
  }
}
    `;

/**
 * __useGetAllCountriesQuery__
 *
 * To run a query within a React component, call `useGetAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
      }
export function useGetAllCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
        }
export function useGetAllCountriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
        }
export type GetAllCountriesQueryHookResult = ReturnType<typeof useGetAllCountriesQuery>;
export type GetAllCountriesLazyQueryHookResult = ReturnType<typeof useGetAllCountriesLazyQuery>;
export type GetAllCountriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCountriesSuspenseQuery>;
export type GetAllCountriesQueryResult = Apollo.QueryResult<GetAllCountriesQuery, GetAllCountriesQueryVariables>;
export const GetAllCountriesStatsPerYearDocument = gql`
    query getAllCountriesStatsPerYear($year: Int!) {
  getAllCountriesStatsPerYear(year: $year) {
    countriesStats {
      countryDetails {
        regionName
        status
        developedStatus
        displayName
        population
      }
      generalStats {
        wins
        losses
        draws
      }
      homeStats {
        wins
        losses
        draws
      }
      awayStats {
        wins
        losses
        draws
      }
    }
  }
}
    `;

/**
 * __useGetAllCountriesStatsPerYearQuery__
 *
 * To run a query within a React component, call `useGetAllCountriesStatsPerYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCountriesStatsPerYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCountriesStatsPerYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetAllCountriesStatsPerYearQuery(baseOptions: Apollo.QueryHookOptions<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables> & ({ variables: GetAllCountriesStatsPerYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>(GetAllCountriesStatsPerYearDocument, options);
      }
export function useGetAllCountriesStatsPerYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>(GetAllCountriesStatsPerYearDocument, options);
        }
export function useGetAllCountriesStatsPerYearSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>(GetAllCountriesStatsPerYearDocument, options);
        }
export type GetAllCountriesStatsPerYearQueryHookResult = ReturnType<typeof useGetAllCountriesStatsPerYearQuery>;
export type GetAllCountriesStatsPerYearLazyQueryHookResult = ReturnType<typeof useGetAllCountriesStatsPerYearLazyQuery>;
export type GetAllCountriesStatsPerYearSuspenseQueryHookResult = ReturnType<typeof useGetAllCountriesStatsPerYearSuspenseQuery>;
export type GetAllCountriesStatsPerYearQueryResult = Apollo.QueryResult<GetAllCountriesStatsPerYearQuery, GetAllCountriesStatsPerYearQueryVariables>;
export const GetAllMatchesByCountryIdDocument = gql`
    query getAllMatchesByCountryId($countryId: Int!) {
  getAllMatchesByCountryId(countryId: $countryId) {
    matches {
      matchDate
      homeTeam {
        regionName
        status
        developedStatus
        displayName
        population
      }
      awayTeam {
        regionName
        status
        developedStatus
        displayName
        population
      }
      homeScore
      awayScore
      tournament
      city
      country
    }
  }
}
    `;

/**
 * __useGetAllMatchesByCountryIdQuery__
 *
 * To run a query within a React component, call `useGetAllMatchesByCountryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMatchesByCountryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMatchesByCountryIdQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetAllMatchesByCountryIdQuery(baseOptions: Apollo.QueryHookOptions<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables> & ({ variables: GetAllMatchesByCountryIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>(GetAllMatchesByCountryIdDocument, options);
      }
export function useGetAllMatchesByCountryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>(GetAllMatchesByCountryIdDocument, options);
        }
export function useGetAllMatchesByCountryIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>(GetAllMatchesByCountryIdDocument, options);
        }
export type GetAllMatchesByCountryIdQueryHookResult = ReturnType<typeof useGetAllMatchesByCountryIdQuery>;
export type GetAllMatchesByCountryIdLazyQueryHookResult = ReturnType<typeof useGetAllMatchesByCountryIdLazyQuery>;
export type GetAllMatchesByCountryIdSuspenseQueryHookResult = ReturnType<typeof useGetAllMatchesByCountryIdSuspenseQuery>;
export type GetAllMatchesByCountryIdQueryResult = Apollo.QueryResult<GetAllMatchesByCountryIdQuery, GetAllMatchesByCountryIdQueryVariables>;
export const GetAllMatchesPerYearWithDetailsDocument = gql`
    query getAllMatchesPerYearWithDetails($year: Int!) {
  getAllMatchesPerYearWithDetails(year: $year) {
    matches {
      matchDate
      homeTeam {
        regionName
        status
        developedStatus
        displayName
        population
      }
      awayTeam {
        regionName
        status
        developedStatus
        displayName
        population
      }
      homeScore
      awayScore
      tournament
      city
      country
    }
  }
}
    `;

/**
 * __useGetAllMatchesPerYearWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetAllMatchesPerYearWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMatchesPerYearWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMatchesPerYearWithDetailsQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetAllMatchesPerYearWithDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables> & ({ variables: GetAllMatchesPerYearWithDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>(GetAllMatchesPerYearWithDetailsDocument, options);
      }
export function useGetAllMatchesPerYearWithDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>(GetAllMatchesPerYearWithDetailsDocument, options);
        }
export function useGetAllMatchesPerYearWithDetailsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>(GetAllMatchesPerYearWithDetailsDocument, options);
        }
export type GetAllMatchesPerYearWithDetailsQueryHookResult = ReturnType<typeof useGetAllMatchesPerYearWithDetailsQuery>;
export type GetAllMatchesPerYearWithDetailsLazyQueryHookResult = ReturnType<typeof useGetAllMatchesPerYearWithDetailsLazyQuery>;
export type GetAllMatchesPerYearWithDetailsSuspenseQueryHookResult = ReturnType<typeof useGetAllMatchesPerYearWithDetailsSuspenseQuery>;
export type GetAllMatchesPerYearWithDetailsQueryResult = Apollo.QueryResult<GetAllMatchesPerYearWithDetailsQuery, GetAllMatchesPerYearWithDetailsQueryVariables>;
export const GetAllScorersDocument = gql`
    query getAllScorers {
  getAllScorers {
    scorers {
      scorerId
      scorerName
    }
  }
}
    `;

/**
 * __useGetAllScorersQuery__
 *
 * To run a query within a React component, call `useGetAllScorersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScorersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScorersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllScorersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScorersQuery, GetAllScorersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllScorersQuery, GetAllScorersQueryVariables>(GetAllScorersDocument, options);
      }
export function useGetAllScorersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScorersQuery, GetAllScorersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllScorersQuery, GetAllScorersQueryVariables>(GetAllScorersDocument, options);
        }
export function useGetAllScorersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllScorersQuery, GetAllScorersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllScorersQuery, GetAllScorersQueryVariables>(GetAllScorersDocument, options);
        }
export type GetAllScorersQueryHookResult = ReturnType<typeof useGetAllScorersQuery>;
export type GetAllScorersLazyQueryHookResult = ReturnType<typeof useGetAllScorersLazyQuery>;
export type GetAllScorersSuspenseQueryHookResult = ReturnType<typeof useGetAllScorersSuspenseQuery>;
export type GetAllScorersQueryResult = Apollo.QueryResult<GetAllScorersQuery, GetAllScorersQueryVariables>;
export const GetAllYearsRegisteredDocument = gql`
    query getAllYearsRegistered {
  getAllYearsRegistered {
    years
  }
}
    `;

/**
 * __useGetAllYearsRegisteredQuery__
 *
 * To run a query within a React component, call `useGetAllYearsRegisteredQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllYearsRegisteredQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllYearsRegisteredQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllYearsRegisteredQuery(baseOptions?: Apollo.QueryHookOptions<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>(GetAllYearsRegisteredDocument, options);
      }
export function useGetAllYearsRegisteredLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>(GetAllYearsRegisteredDocument, options);
        }
export function useGetAllYearsRegisteredSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>(GetAllYearsRegisteredDocument, options);
        }
export type GetAllYearsRegisteredQueryHookResult = ReturnType<typeof useGetAllYearsRegisteredQuery>;
export type GetAllYearsRegisteredLazyQueryHookResult = ReturnType<typeof useGetAllYearsRegisteredLazyQuery>;
export type GetAllYearsRegisteredSuspenseQueryHookResult = ReturnType<typeof useGetAllYearsRegisteredSuspenseQuery>;
export type GetAllYearsRegisteredQueryResult = Apollo.QueryResult<GetAllYearsRegisteredQuery, GetAllYearsRegisteredQueryVariables>;
export const GetCountryStatsPerYearDocument = gql`
    query getCountryStatsPerYear($countryId: Int!) {
  getCountryStatsPerYear(countryId: $countryId) {
    years {
      yearDate
      generalStats {
        wins
        losses
        draws
      }
      homeStats {
        wins
        losses
        draws
      }
      awayStats {
        wins
        losses
        draws
      }
    }
  }
}
    `;

/**
 * __useGetCountryStatsPerYearQuery__
 *
 * To run a query within a React component, call `useGetCountryStatsPerYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountryStatsPerYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountryStatsPerYearQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useGetCountryStatsPerYearQuery(baseOptions: Apollo.QueryHookOptions<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables> & ({ variables: GetCountryStatsPerYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>(GetCountryStatsPerYearDocument, options);
      }
export function useGetCountryStatsPerYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>(GetCountryStatsPerYearDocument, options);
        }
export function useGetCountryStatsPerYearSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>(GetCountryStatsPerYearDocument, options);
        }
export type GetCountryStatsPerYearQueryHookResult = ReturnType<typeof useGetCountryStatsPerYearQuery>;
export type GetCountryStatsPerYearLazyQueryHookResult = ReturnType<typeof useGetCountryStatsPerYearLazyQuery>;
export type GetCountryStatsPerYearSuspenseQueryHookResult = ReturnType<typeof useGetCountryStatsPerYearSuspenseQuery>;
export type GetCountryStatsPerYearQueryResult = Apollo.QueryResult<GetCountryStatsPerYearQuery, GetCountryStatsPerYearQueryVariables>;
export const GetGlobalScoringStatsDocument = gql`
    query getGlobalScoringStats {
  getGlobalScoringStats {
    scoringStats {
      countryDetails {
        regionName
        status
        developedStatus
        displayName
        population
      }
      totalWins
      score
      averageWinsPerYear
      averageScorePerYear
    }
  }
}
    `;

/**
 * __useGetGlobalScoringStatsQuery__
 *
 * To run a query within a React component, call `useGetGlobalScoringStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGlobalScoringStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGlobalScoringStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGlobalScoringStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>(GetGlobalScoringStatsDocument, options);
      }
export function useGetGlobalScoringStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>(GetGlobalScoringStatsDocument, options);
        }
export function useGetGlobalScoringStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>(GetGlobalScoringStatsDocument, options);
        }
export type GetGlobalScoringStatsQueryHookResult = ReturnType<typeof useGetGlobalScoringStatsQuery>;
export type GetGlobalScoringStatsLazyQueryHookResult = ReturnType<typeof useGetGlobalScoringStatsLazyQuery>;
export type GetGlobalScoringStatsSuspenseQueryHookResult = ReturnType<typeof useGetGlobalScoringStatsSuspenseQuery>;
export type GetGlobalScoringStatsQueryResult = Apollo.QueryResult<GetGlobalScoringStatsQuery, GetGlobalScoringStatsQueryVariables>;
export const GetMatchStatsPerYearDocument = gql`
    query getMatchStatsPerYear($year: Int!) {
  getMatchStatsPerYear(year: $year) {
    matchesNumber
    matchesWithShootouts
    draws
    friendlyMatches
  }
}
    `;

/**
 * __useGetMatchStatsPerYearQuery__
 *
 * To run a query within a React component, call `useGetMatchStatsPerYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchStatsPerYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchStatsPerYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetMatchStatsPerYearQuery(baseOptions: Apollo.QueryHookOptions<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables> & ({ variables: GetMatchStatsPerYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>(GetMatchStatsPerYearDocument, options);
      }
export function useGetMatchStatsPerYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>(GetMatchStatsPerYearDocument, options);
        }
export function useGetMatchStatsPerYearSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>(GetMatchStatsPerYearDocument, options);
        }
export type GetMatchStatsPerYearQueryHookResult = ReturnType<typeof useGetMatchStatsPerYearQuery>;
export type GetMatchStatsPerYearLazyQueryHookResult = ReturnType<typeof useGetMatchStatsPerYearLazyQuery>;
export type GetMatchStatsPerYearSuspenseQueryHookResult = ReturnType<typeof useGetMatchStatsPerYearSuspenseQuery>;
export type GetMatchStatsPerYearQueryResult = Apollo.QueryResult<GetMatchStatsPerYearQuery, GetMatchStatsPerYearQueryVariables>;
export const GetScorerStatsByIdDocument = gql`
    query getScorerStatsById($scorerId: Int!) {
  getScorerStatsById(scorerId: $scorerId) {
    scorerId
    scorerName
    teamDetails {
      regionName
      status
      developedStatus
      displayName
      population
    }
    mostGoalsScored
    statsByYear {
      year
      totalGoals
      teamTotalMatches
    }
  }
}
    `;

/**
 * __useGetScorerStatsByIdQuery__
 *
 * To run a query within a React component, call `useGetScorerStatsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScorerStatsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScorerStatsByIdQuery({
 *   variables: {
 *      scorerId: // value for 'scorerId'
 *   },
 * });
 */
export function useGetScorerStatsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables> & ({ variables: GetScorerStatsByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>(GetScorerStatsByIdDocument, options);
      }
export function useGetScorerStatsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>(GetScorerStatsByIdDocument, options);
        }
export function useGetScorerStatsByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>(GetScorerStatsByIdDocument, options);
        }
export type GetScorerStatsByIdQueryHookResult = ReturnType<typeof useGetScorerStatsByIdQuery>;
export type GetScorerStatsByIdLazyQueryHookResult = ReturnType<typeof useGetScorerStatsByIdLazyQuery>;
export type GetScorerStatsByIdSuspenseQueryHookResult = ReturnType<typeof useGetScorerStatsByIdSuspenseQuery>;
export type GetScorerStatsByIdQueryResult = Apollo.QueryResult<GetScorerStatsByIdQuery, GetScorerStatsByIdQueryVariables>;