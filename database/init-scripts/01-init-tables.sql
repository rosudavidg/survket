CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR (25) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id) NOT NULL,
    activated BOOLEAN DEFAULT FALSE,
    email VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (64) NOT NULL,
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
    name VARCHAR(256) NOT NULL,
    reward INTEGER NOT NULL,
    timestamp_created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS surveys_texts (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    question VARCHAR (256) NOT NULL
);

CREATE TABLE IF NOT EXISTS surveys_choices (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    question VARCHAR (256) NOT NULL
);

CREATE TABLE IF NOT EXISTS surveys_choices_elements (
    id SERIAL PRIMARY KEY,
    survey_choice_id INTEGER REFERENCES surveys_choices(id) ON DELETE CASCADE,
    text VARCHAR (256) NOT NULL
);

CREATE TABLE IF NOT EXISTS confirmations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
    token VARCHAR (64) NOT NULL
);

CREATE TABLE IF NOT EXISTS solved_surveys (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    timestamp_solved TIMESTAMP DEFAULT NOW(),
    UNIQUE (survey_id, user_id)
);

CREATE TABLE IF NOT EXISTS solved_surveys_texts (
    id SERIAL PRIMARY KEY,
    solved_survey_id INTEGER REFERENCES solved_surveys(id) ON DELETE CASCADE,
    survey_text_id INTEGER REFERENCES surveys_texts(id) ON DELETE CASCADE,
    answer VARCHAR (256) NOT NULL
);

CREATE TABLE IF NOT EXISTS solved_surveys_choices (
    id SERIAL PRIMARY KEY,
    solved_survey_id INTEGER REFERENCES solved_surveys(id) ON DELETE CASCADE,
    survey_choice_id INTEGER REFERENCES surveys_choices(id) ON DELETE CASCADE,
    survey_choice_element_id INTEGER REFERENCES surveys_choices_elements(id) ON DELETE CASCADE
);
