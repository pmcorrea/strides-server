BEGIN;

CREATE TYPE user_status AS ENUM (
    'admin',
    'user',
    'blocked'
);

CREATE TYPE visibility AS ENUM (
    'Public',
    'Private'
);

CREATE TABLE table1 (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name TEXT UNIQUE NOT NULL,
    user_password TEXT NOT NULL,
    user_status user_status NOT NULL,
    visibility visibility NOT NULL,
    avatar TEXT NOT NULL
);

COMMIT;