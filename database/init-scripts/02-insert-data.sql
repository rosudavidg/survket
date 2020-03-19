INSERT INTO roles (id, role) VALUES (1, 'admin');
INSERT INTO roles (id, role) VALUES (2, 'support');
INSERT INTO roles (id, role) VALUES (3, 'user_solver');
INSERT INTO roles (id, role) VALUES (4, 'user_creator');

INSERT INTO
    users (first_name, last_name, email, activated, role_id, date_of_birth)
    VALUES ('David', 'Rosu', 'rosudavidg@gmail.com', TRUE, 1, '1997-04-03');

INSERT INTO
    users (first_name, last_name, email, activated, role_id, date_of_birth)
    VALUES ('Dani', 'Mocanu', 'regele@vizualizarilor.top', TRUE, 2, '1996-04-03');

INSERT INTO
    users (first_name, last_name, email, activated, role_id, date_of_birth)
    VALUES ('Valentin', 'Electro', 'ineedmoney@broke.xyz', TRUE, 3, '1995-04-03');

INSERT INTO
    users (first_name, last_name, email, activated, role_id, date_of_birth)
    VALUES ('Osan', 'Oficial', 'diferenta@buzunarul.tau', TRUE, 4, '1994-04-03');
