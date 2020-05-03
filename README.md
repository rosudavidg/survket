# survket

![alt text](https://github.com/rosudavidg/survket/blob/master/frontend/public/logo.png?raw=true)

## Descrierea aplicatiei 📄

Aplicatia reprezinta o platforma web, in care un utilizatorii completeaza
chestionare create de companii, cu scopul de a castiga monede virtuale, pe
care le pot transforma apoi in bani sau beneficii.

In dezvoltarea aplicatiei folosesc Docker: fiecare serviciu este un container,
iar aplicatia ruleaza ca un stack de servicii.

Există 3 roluri diferite:

1. Administrator
   - modifica costul de adaugare al unui chestionar
   - sterge chestionare
   - vizualizare intrebari
   - raspunde la intrebari
   - adauga/elimina intrebari FAQ
2. Utilizator
   1. Persoană fizică (solver)
      - rezolvă chestionare
   2. Persoană juridică (creator)
      - adaugă chestionare
      - sterge chestionare
3. Suport tehnic
   - vizualizare tichete
   - raspunde la intrebari
   - adauga/elimina intrebari FAQ

In plus, oricine poate adauga o intrebare si poate vizualiza FAQ.

## Docker 🐳

### Servicii

Clientul comunica direct cu serverul de frontend.
Serverul de frontend comunica direct cu serverul de backend.
Serverul de backend prelucreaza cererile de la cel de frontend. Acesta comunica
cu baza de date (serviciul database) si cu serviciul de email.

#### Backend ✅

Backend-ul este realizat in NodeJS, folosind Express. Pentru autentificare
am utilizat JWT.

#### Frontend ⚛️

Frontend-ul este realizat in React. Am utilizat React Router pentru
rutarea cererilor catre SPA si Axios pentru cererile la backend.

#### Database 💿

Baza de date pe care am ales sa o folosesc este Postgres.
Serviciul expune portul 5432.
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

#### Email API 📧

Serviciu de trimitere emailuri. Este dezvoltat in Python, cu ajutorul
framework-ului Flask. Concret, aplicatia primeste cereri HTTP pe care le
prelucreaza si trimite emailuri specifice.

Sunt doua tipuri de email. Unul este cel care trimite link-ul de activare
al contului, iar cel de-al doilea care trimite raspunsul la o intrebare
adaugata in sectiunea Contact.

| Endpoint | Params                  | Descriere                  |
| -------- | ----------------------- | -------------------------- |
| /        | email, token            | Trimite linkul de activare |
| /contact | email, question, answer | Trimite raspunsul pe email |

#### Grafana 👀

Serviciul Grafana este adaugat pentru a urmari diverse statistici, spre
exemplu numarul de conturi noi.

### Auto deploy Docker Hub

Auto deploy este configurat pentru fiecare branch in parte. La fiecare push
intr-un branch, Docker Hub va face build si deploy.

| Git Branch       | Docker Hub                  |
| ---------------- | --------------------------- |
| develop-backend  | rosudavidg/survket-backend  |
| develop-frontend | rosudavidg/survket-frontend |
| develop-database | rosudavidg/survket-database |
| develop-email    | rosudavidg/survket-email    |

## Pregatirea aplicatiei - Setarea datelor 🤫

```bash
mkdir secrets && cd secrets
echo my_database_name     > secret_database_db
echo my_database_user     > secret_database_user
echo my_database_password > secret_database_password
echo my_email_address     > secret_email_address
echo my_email_password    > secret_email_password
echo my_grafana_password  > secret_grafana_password
echo my_jwt_key           > secret_jwt_key
```

## Pornirea aplicatiei ⬆️

1.  Adaugarea a doua masini virtuale

```bash
docker-machine create --driver virtualbox myvm1
docker-machine create --driver virtualbox myvm2
```

2. Copierea aplicatiei pe masina virtuala cu rol de manager

```bash
docker-machine scp docker-compose.yml myvm1:.
docker-machine scp -r secrets/ myvm1:.
```

3. Conectarea la masina manager

```bash
docker-machine ssh myvm1
```

4. Pornirea unui swarm

```bash
docker swarm init --advertise-addr <IP-ul masinii curente>
```

5. Conectarea pe a doua masina virtuala

```bash
   docker-machine ssh myvm2
```

6. Atasarea masinii la swarm

```bash
   docker swarm join --token <TOKEN> <IP>:2377
```

7. Revenim pe prima masina

```bash
   docker-machine ssh myvm1
```

8. Pornim stack-ul de docker

```bash
   docker stack deploy -c docker-compose.yml survket
```

### Conectare la aplicatie (la frontend):

`<IP myvm1 sau myvm2>:3001`

### Conectare la serviciul de monitorizare (Grafana):

`<IP myvm1 sau myvm2>:30009`

### Alte comenzi utile

| Comanda                           | Descriere                |
| --------------------------------- | ------------------------ |
| Listare masini                    | docker-machine ls        |
| Conectarea prin ssh la o masina   | docker-machine ssh myvm1 |
| Informatii despre stack           | docker stack ps survket  |
| Informatii despre servicii        | docker service ls        |
| Informatii despre nodul din swarm | docker node ps           |
| Stergerea stack-ului              | docker stack rm survket  |
| Stergerea masinii virtuale        | docker-machine rm myvm1  |
