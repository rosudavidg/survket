# survket

## Descrierea aplicatiei

Aplicatia reprezinta o platforma web, in care un utilizatorii completeaza
chestionare create de companii, cu scopul de a castiga monede virtuale, pe
care le pot transforma apoi in bani sau beneficii.

In dezvoltarea aplicatiei folosesc Docker: fiecare serviciu este un container,
iar aplicatia ruleaza ca un stack de servicii.

## Docker

### Servicii
------

#### Backend
------

#### Frontend
------

#### Database
------
Baza de date pe care am ales sa o folosesc este MySql.
Serviciul expune portul 3306.
La initializare, sunt copiate si rulate scripturile din databse/init-scripts.

Tabela users

| Denumire camp | Tip de date | Detalii                      |
| ------------- | ----------- | ---------------------------- |
| id            | int         | Id-ul unic al utilizatorului |
| name          | varchar     | Numele de familie            |
| email         | varchar     | Email-ul utilizatorului      |
| password      | varchar     | Parola utilizatorului        |
| coins         | int         | Numarul monedelor virtuale   |
| activated     | boolean     | Contul este sau nu activat   |

#### Email API
------
Serviciu de trimitere emailuri. Acesta este scris in Python.

### Auto deploy
------

Auto deploy este configurat pentru fiecare branch in parte. La fiecare push
intr-un branch, Docker Hub va face build si deploy.

| Branch   | docker hub                  |
| -------- | --------------------------- |
| backend  | rosudavidg/survket-backend  |
| frontend | rosudavidg/survket-frontend |
| database | rosudavidg/survket-database |
