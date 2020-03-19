CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR (25) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id) NOT NULL,
    activated BOOLEAN DEFAULT FALSE,
    email VARCHAR (50) NOT NULL UNIQUE,
    first_name VARCHAR (25) NOT NULL,
    last_name VARCHAR (25) NOT NULL,
    gender CHAR,
    date_of_birth DATE NOT NULL,
    timestamp_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS solver_users (
    id INTEGER PRIMARY KEY REFERENCES users(id),
    coins INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS creator_users (
    id INTEGER PRIMARY KEY REFERENCES users(id),
    company_name VARCHAR (50),
    coins INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    creator INTEGER REFERENCES users(id) NOT NULL,
    reward INTEGER NOT NULL
    timestamp_created TIMESTAMP DEFAULT NOW()
);
