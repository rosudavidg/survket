# Backend

## Rute Backend API

### /users/

| Tip  | Ruta      | Body Requirements                                               | Authentication | Authorization  | Info                                        |
| ---- | --------- | --------------------------------------------------------------- | :------------: | -------------- | ------------------------------------------- |
| GET  | /         |                                                                 |       ✅        | admin, support | Intoarce lista (detaliata) cu utilizatori   |
| POST | /         | first_name, last_name, email, password, date_of_birth , role_id |       ✅        | admin, support | Creeaza un utilizator nou                   |
| POST | /register | first_name, last_name, email, password, date_of_birth           |                |                | Creeaza un utilizator nou                   |
| POST | /login    | email, password                                                 |                |                | Autentifica un utilizator. Se intoarce JWT. |

### /surveys/
    TODO: write me

## Body Requirements

| Nume          | Tip      | Lungime Maxima | Info                                         |
| ------------- | -------- | :------------: | -------------------------------------------- |
| first_name    | alpha    |       25       | Prenumele unui utilizator                    |
| last_name     | alpha    |       25       | Numele unui utilizator                       |
| role_id       | int      |                | Rolul unui utilizator (vezi sectiunea Roles) |
| date_of_birth | date     |                | Data de nastere a utilizatorului             |
| email         | email    |       50       | Email-ul utilizatorului                      |
| password      | password |                | Parola utilizatorului                        |
| password      | password |                | Parola utilizatorului                        |
| gender        | alpha    |       1        | Genul utilizatorului                         |

## Roles
    TODO: write me
