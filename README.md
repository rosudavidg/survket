# survket

## Descrierea aplicatiei

Aplicatia reprezinta o platforma web, in care un utilizatorii completeaza
chestionare create de companii, cu scopul de a castiga monede virtuale, pe
care le pot transforma apoi in bani sau beneficii.

In dezvoltarea aplicatiei folosesc Docker: fiecare serviciu este un container,
iar aplicatia ruleaza ca un stack de servicii.

Există 3 roluri diferite:
1. Administrator
   - modifică rate de schimb monede virtuale - bani
   - adaugă chestionare speciale
   - aprobă cereri noi de înscriere (persoane juridice)
   - modifică planul tarifar
2. Utilizator
    1. Persoană fizică
       - rezolvă chestionare
       - schimbă monede virtuale în bani
       - utilizează vouchere
       - pot adăuga tichete (suport tehnic)
    2. Persoană juridică
       - adaugă chestionare
       - adaugă vouchere
       - pot adăuga tichete (suport tehnic)
3. Suport tehnic
   - CRUD chestionare
   - adaugă vouchere
   - oferă informații
   - vizualizare tichete

## Docker

### Servicii

Clientul comunica direct cu serverul de frontend.
Serverul de frontend comunica direct cu serverul de backend.
Serverul de backend prelucreaza cererile de la cel de frontend. Acesta comunica
cu baza de date (serviciul database) si cu serviciul de email.

#### Backend

TODO

#### Frontend

TODO

#### Database

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
Serviciu de trimitere emailuri. Este dezvoltat in Python, cu ajutorul
framework-ului Flask. Concret, aplicatia primeste cereri HTTP pe care le
prelucreaza si trimite emailuri specifice.

##### Setarea datelor

```bash
printf "my@secret.email" | docker secret create secret_email -
printf "mysecretemailpassword" | docker secret create secret_email_password -
```

| Endpoint | Params       | Descriere                  |
| -------- | ------------ | -------------------------- |
| /        | email, token | Trimite linkul de activare |

### Auto deploy

Auto deploy este configurat pentru fiecare branch in parte. La fiecare push
intr-un branch, Docker Hub va face build si deploy.

| Branch           | docker hub                  |
| ---------------- | --------------------------- |
| develop-backend  | rosudavidg/survket-backend  |
| develop-frontend | rosudavidg/survket-frontend |
| develop-database | rosudavidg/survket-database |
| develop-email    | rosudavidg/survket-email    |
