INSERT INTO roles (id, role) VALUES (1, 'admin');
INSERT INTO roles (id, role) VALUES (2, 'support');
INSERT INTO roles (id, role) VALUES (3, 'user_solver');
INSERT INTO roles (id, role) VALUES (4, 'user_creator');

INSERT INTO
    users (first_name, last_name, email, password, activated, role_id, date_of_birth)
    VALUES ('David', 'Rosu', 'rosudavidg@gmail.com', '$2a$05$.Err72Bs/V43iN25E0aL2OEEHi0H/RKa.K4MlIh/wtNv7lqGkWcF.', TRUE, 1, '1997-04-03');

INSERT INTO
    users (first_name, last_name, email, password, activated, role_id, date_of_birth)
    VALUES ('Dani', 'Mocanu', 'regele@vizualizarilor.top', '$2a$05$.Err72Bs/V43iN25E0aL2OEEHi0H/RKa.K4MlIh/wtNv7lqGkWcF.', TRUE, 2, '1996-04-03');

INSERT INTO
    users (first_name, last_name, email, password, activated, role_id, date_of_birth)
    VALUES ('Valentin', 'Electro', 'ineedmoney@broke.xyz', '$2a$05$.Err72Bs/V43iN25E0aL2OEEHi0H/RKa.K4MlIh/wtNv7lqGkWcF.', TRUE, 3, '1995-04-03');

INSERT INTO
    users (first_name, last_name, email, password, activated, role_id, date_of_birth)
    VALUES ('Osan', 'Oficial', 'diferenta@buzunarul.tau', '$2a$05$.Err72Bs/V43iN25E0aL2OEEHi0H/RKa.K4MlIh/wtNv7lqGkWcF.', TRUE, 4, '1994-04-03');

INSERT INTO
    users (first_name, last_name, email, password, activated, role_id, date_of_birth)
    VALUES ('Miahi', 'Banditu', 'carrefour@galactic.tau', '$2a$05$.Err72Bs/V43iN25E0aL2OEEHi0H/RKa.K4MlIh/wtNv7lqGkWcF.', TRUE, 4, '1994-04-03');
