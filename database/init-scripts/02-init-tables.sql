CREATE TABLE IF NOT EXISTS users (
    id integer auto_increment,
    first_name varchar(25),
    last_name varchar(25),
    email varchar(50),
    primary key(id)
);

insert into users(first_name, last_name, email) values("David", "Rosu", "rosudavidg@gmail.com");
