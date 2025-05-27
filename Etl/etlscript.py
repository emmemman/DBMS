import csv
import os
import mysql.connector
from collections import defaultdict
from datetime import datetime
from rapidfuzz import fuzz, process

# Function to find the best matching country
def find_best_country_match(team_name, countries_list, threshold=60):
    """Find the best match for a country name using fuzzy matching."""
    match = process.extractOne(
        team_name,
        countries_list,
        scorer=fuzz.token_sort_ratio
    )
    if match and match[1] >= threshold:
        return match[0]
    else:
        return None

# Function to remove null bytes and read CSV safely
def clean_and_read_csv(filepath):
    """ Cleans null bytes and reads CSV into a list of dictionaries. """
    encodings = ["utf-8", "latin1", "cp1252"]

    temp_filepath = filepath + "_cleaned.csv"
    with open(filepath, "rb") as f:
        content = f.read().replace(b"\x00", b"")

    with open(temp_filepath, "wb") as temp_f:
        temp_f.write(content)

    for enc in encodings:
        try:
            with open(temp_filepath, "r", encoding=enc, newline='') as f:
                reader = csv.DictReader(f)
                data = list(reader)
            os.remove(temp_filepath)  # After reading, remove safely
            print(f"Successfully read {filepath} with encoding: {enc}")
            return data
        except UnicodeDecodeError:
            continue

    os.remove(temp_filepath)
    raise ValueError(f"Unable to decode {filepath} with common encodings.")

# Load CSV data
countries = clean_and_read_csv("countries.csv")
results = clean_and_read_csv("results.csv")
shootouts = clean_and_read_csv("shootouts.csv")

# Print headers for debugging
print("Countries fields:", countries[0].keys())
print("Results fields:", results[0].keys())
print("Shootouts fields:", shootouts[0].keys())

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0000",
    database="my_database"
)

cursor = conn.cursor()
cursor.execute("SET FOREIGN_KEY_CHECKS = 0")
cursor.execute("DROP TABLE IF EXISTS player_goals")
cursor.execute("DROP TABLE IF EXISTS matches")
cursor.execute("DROP TABLE IF EXISTS country_stats")
cursor.execute("DROP TABLE IF EXISTS countries")
cursor.execute("SET FOREIGN_KEY_CHECKS = 1")
conn.commit()
print("✅ Dropped existing tables if they existed.")

# Create tables
cursor.execute("""
CREATE TABLE IF NOT EXISTS countries (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    iso_code VARCHAR(10) NOT NULL,
    iso3_code VARCHAR(10) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    region_name VARCHAR(50),
    status VARCHAR(200),
    developed_status VARCHAR(20),
    population BIGINT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS country_stats (
    country_stat_id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT,
    country_name VARCHAR(100),
    match_year INT,
    wins INT,
    losses INT,
    draws INT,
    home_wins INT,
    home_losses INT,
    home_draws INT,
    away_wins INT,
    away_losses INT,
    away_draws INT,
    shootout_participations INT DEFAULT 0,
    FOREIGN KEY (country_id) REFERENCES countries (country_id)
)
""")

cursor.execute("""CREATE TABLE IF NOT EXISTS matches (
    match_id INT AUTO_INCREMENT PRIMARY KEY,
    home_team_country_id INT,
    away_team_country_id INT,
    match_date DATE,
    year INT,
    home_score INT,
    away_score INT,
    tournament VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100),
    neutral BOOLEAN,
    draw BOOLEAN,
    had_shootout BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (home_team_country_id) REFERENCES countries (country_id),
    FOREIGN KEY (away_team_country_id) REFERENCES countries (country_id)
)
""")
conn.commit()

# Insert countries into database
country_name_to_id = {}
all_country_names = []

for country in countries:
    iso_code = country.get("ISO_Code", "").strip()
    iso3_code = country.get("ISO3", "").strip()
    display_name = country.get("Display_Name", "").strip()
    region_name = country.get("Region Name", None)
    status = country.get("Status", None)
    developed_status = country.get("Developed or Developing", None)
    population = country.get("Population", None)

    cursor.execute("""
        INSERT INTO countries (iso_code, iso3_code, display_name, region_name, status, developed_status, population)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (iso_code, iso3_code, display_name, region_name, status, developed_status, population))

    country_id = cursor.lastrowid
    country_name_lower = display_name.lower()
    country_name_to_id[country_name_lower] = country_id
    all_country_names.append(display_name)

conn.commit()
print("✅ Inserted all countries.")

# Create lists of team names from results for fuzzy matching
all_home_teams = list(set([r['home_team'].strip().lower() for r in results]))
all_away_teams = list(set([r['away_team'].strip().lower() for r in results]))
all_teams = list(set(all_home_teams + all_away_teams))

# Create a set to store shootout matches for quick lookup
shootout_matches = set()

# Pre-process shootout data for matching
for shootout in shootouts:
    try:
        shootout_date = shootout["date"]
        shootout_home = shootout["home_team"].strip().lower()
        shootout_away = shootout["away_team"].strip().lower()
        
        # Find best matches in results data
        matched_home = find_best_country_match(shootout_home, all_teams)
        matched_away = find_best_country_match(shootout_away, all_teams)
        
        if matched_home and matched_away:
            # Create a key with matched names
            match_key = (shootout_date, matched_home, matched_away)
            shootout_matches.add(match_key)
    except KeyError as e:
        print(f"⚠️ Error processing shootout record: {e} - Shootout data: {shootout}")
        continue

print(f"ℹ️ Loaded {len(shootout_matches)} shootout records for matching")

# Initialize stats dictionary
country_stats = defaultdict(lambda: defaultdict(lambda: {
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "home_wins": 0,
    "home_losses": 0,
    "home_draws": 0,
    "away_wins": 0,
    "away_losses": 0,
    "away_draws": 0,
    "shootout_participations": 0
}))

# Process each match
for match in results:
    try:
        match_date = match["date"]
        home_team = match["home_team"].strip()
        away_team = match["away_team"].strip()
        home_score = int(match["home_score"])
        away_score = int(match["away_score"])
        tournament = match["tournament"].strip()
        city = match["city"].strip()
        country = match["country"].strip()
        neutral = match["neutral"].strip().lower() == "true"
        draw = home_score == away_score
        
        # Create match key for shootout lookup
        match_key = (match_date, home_team.lower(), away_team.lower())
        
        # Check if this match went to shootout
        had_shootout = match_key in shootout_matches and draw
        
        year = datetime.strptime(match_date, "%Y-%m-%d").year
        home_team_lower = home_team.lower()
        away_team_lower = away_team.lower()
        
        # Find best country match for home team
        matched_home_country_name = find_best_country_match(home_team, [c["Display_Name"] for c in countries])
        home_team_country_id = country_name_to_id.get(matched_home_country_name.lower(), None) if matched_home_country_name else None

        # Find best country match for away team
        matched_away_country_name = find_best_country_match(away_team, [c["Display_Name"] for c in countries])
        away_team_country_id = country_name_to_id.get(matched_away_country_name.lower(), None) if matched_away_country_name else None

        if home_team_country_id is None or away_team_country_id is None:
            print(f"⚠️ Skipping match: {home_team} vs {away_team} on {match_date} - Country ID not found.")
            continue

        # Insert match record
        cursor.execute("""
            INSERT INTO matches (home_team_country_id, away_team_country_id, match_date, year, 
                               home_score, away_score, tournament, city, country, 
                               neutral, draw, had_shootout)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (home_team_country_id, away_team_country_id, match_date, year, 
              home_score, away_score, tournament, city, country, 
              neutral, draw, had_shootout))

        # Update stats for home team
        if home_score > away_score:
            country_stats[home_team_lower][year]["wins"] += 1
            country_stats[home_team_lower][year]["home_wins"] += 1
        elif home_score < away_score:
            country_stats[home_team_lower][year]["losses"] += 1
            country_stats[home_team_lower][year]["home_losses"] += 1
        else:
            country_stats[home_team_lower][year]["draws"] += 1
            country_stats[home_team_lower][year]["home_draws"] += 1
            if had_shootout:
                country_stats[home_team_lower][year]["shootout_participations"] += 1

        # Update stats for away team
        if away_score > home_score:
            country_stats[away_team_lower][year]["wins"] += 1
            country_stats[away_team_lower][year]["away_wins"] += 1
        elif away_score < home_score:
            country_stats[away_team_lower][year]["losses"] += 1
            country_stats[away_team_lower][year]["away_losses"] += 1
        else:
            country_stats[away_team_lower][year]["draws"] += 1
            country_stats[away_team_lower][year]["away_draws"] += 1
            if had_shootout:
                country_stats[away_team_lower][year]["shootout_participations"] += 1

    except KeyError as e:
        print(f"⚠️ KeyError processing match record: {e} - Match data: {match}")
        continue
    except ValueError as e:
        print(f"⚠️ ValueError processing match record: {e} - Match data: {match}")
        continue

# Insert country_stats into database
for country_name_lower, years in country_stats.items():
    # Find best match in our country names
    matched_country_name = find_best_country_match(country_name_lower, all_country_names)
    
    if not matched_country_name:
        print(f"⚠️ Warning: {country_name_lower} not found in countries, skipping stats...")
        continue
        
    country_id = country_name_to_id.get(matched_country_name.lower())
    
    if not country_id:
        print(f"⚠️ Warning: No ID found for matched country {matched_country_name}, skipping stats...")
        continue

    for year, stats in years.items():
        cursor.execute("""
            INSERT INTO country_stats (
                country_id, country_name, match_year, 
                wins, losses, draws,
                home_wins, home_losses, home_draws,
                away_wins, away_losses, away_draws,
                shootout_participations
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            country_id, matched_country_name, year,
            stats["wins"], stats["losses"], stats["draws"],
            stats["home_wins"], stats["home_losses"], stats["home_draws"],
            stats["away_wins"], stats["away_losses"], stats["away_draws"],
            stats["shootout_participations"]
        ))

conn.commit()
print("✅ Inserted all country stats.")





# === Προετοιμασία για goalscorers ===
goalscorers = clean_and_read_csv("goalscorers.csv")

# Ομαδοποίηση: (date, scorer, team) => count goals
from collections import Counter, defaultdict
goal_counter = Counter()
player_max_goals = defaultdict(int)

for g in goalscorers:
    try:
        if g["own_goal"].strip().lower() == "true":
            continue  # Ignore own goals
        key = (g["date"], g["scorer"].strip(), g["team"].strip())
        goal_counter[key] += 1
    except KeyError:
        continue

# Update max goals in a match for each player
for (match_date, scorer_name, team_name), goals in goal_counter.items():
    player_key = (scorer_name, team_name)
    player_max_goals[player_key] = max(player_max_goals[player_key], goals)

# Προσθήκη πίνακα στη βάση
cursor.execute("DROP TABLE IF EXISTS player_goals")
cursor.execute("""
CREATE TABLE IF NOT EXISTS player_goals (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100),
    match_date DATE,
    year INT,
    goals INT,
    most_goals_scored INT,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES countries (country_id)
)
""")
conn.commit()

# Εισαγωγή δεδομένων
for (match_date, scorer_name, team_name), goals in goal_counter.items():
    try:
        year = datetime.strptime(match_date, "%Y-%m-%d").year
        matched_country_name = find_best_country_match(team_name, all_country_names)
        if not matched_country_name:
            print(f"⚠️ No match for scorer team: {team_name}")
            continue

        team_id = country_name_to_id.get(matched_country_name.lower())
        if not team_id:
            print(f"⚠️ No team_id found for matched country: {matched_country_name}")
            continue

        most_goals = player_max_goals[(scorer_name, team_name)]

        cursor.execute("""
            INSERT INTO player_goals (player_name, match_date, year, goals, most_goals_scored, team_id)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (scorer_name, match_date, year, goals, most_goals, team_id))

    except Exception as e:
        print(f"⚠️ Error inserting goal record for {scorer_name} on {match_date}: {e}")
        continue

conn.commit()
print("✅ Inserted all player goal stats with most_goals_scored, ignoring own goals.")
# Close the connection
cursor.close()
conn.close()
print("✅ Database operations completed.")