CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name varchar(25),
    last_name varchar(25),
    email varchar(50)
);

insert into users(first_name, last_name, email) values ('David', 'Rosu', 'rosudavidg@gmail.com');
