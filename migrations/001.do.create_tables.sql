BEGIN;

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    avatar TEXT,
    habits_done TEXT DEFAULT '0', 
    logged_total TEXT DEFAULT '0', 
    perfect_habits TEXT DEFAULT '0', 
    biggest_streak TEXT DEFAULT '0'
);

CREATE TABLE habits (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    sunday BOOLEAN NOT NULL,
    monday BOOLEAN NOT NULL,
    tuesday BOOLEAN NOT NULL,
    wednesday BOOLEAN NOT NULL,
    thursday BOOLEAN NOT NULL,
    friday BOOLEAN NOT NULL,
    saturday BOOLEAN NOT NULL,
    logged_total TEXT DEFAULT '0', 
    logged_on_schedule TEXT DEFAULT '0', 
    logged_off_schedule TEXT DEFAULT '0', 
    logged_missed TEXT DEFAULT '0', 
    habit_start_date TEXT NOT NULL,
    current_streak INTEGER DEFAULT 0,
    highest_streak INTEGER DEFAULT 0,
    last_log TEXT DEFAULT '2020-01-01T00:00:00.000Z',
    last_scheduled_logged TEXT DEFAULT '',
    perfect_streak BOOLEAN DEFAULT true,
    day0 BOOLEAN DEFAULT false,
    day1 BOOLEAN DEFAULT false,
    day2 BOOLEAN DEFAULT false,
    day3 BOOLEAN DEFAULT false,
    day4 BOOLEAN DEFAULT false,
    day5 BOOLEAN DEFAULT false,
    day6 BOOLEAN DEFAULT false,
    day7 BOOLEAN DEFAULT false,
    day8 BOOLEAN DEFAULT false,
    day9 BOOLEAN DEFAULT false,
    day10 BOOLEAN DEFAULT false,
    day11 BOOLEAN DEFAULT false,
    day12 BOOLEAN DEFAULT false,
    day13 BOOLEAN DEFAULT false,
    day14 BOOLEAN DEFAULT false,
    day15 BOOLEAN DEFAULT false,
    day16 BOOLEAN DEFAULT false,
    day17 BOOLEAN DEFAULT false,
    day18 BOOLEAN DEFAULT false,
    day19 BOOLEAN DEFAULT false,
    day20 BOOLEAN DEFAULT false,
    day21 BOOLEAN DEFAULT false,
    day22 BOOLEAN DEFAULT false,
    day23 BOOLEAN DEFAULT false,
    day24 BOOLEAN DEFAULT false,
    day25 BOOLEAN DEFAULT false,
    day26 BOOLEAN DEFAULT false,
    day27 BOOLEAN DEFAULT false,
    day28 BOOLEAN DEFAULT false,
    day29 BOOLEAN DEFAULT false
);

COMMIT;