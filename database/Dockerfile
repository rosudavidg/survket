FROM mysql:5

ENV MYSQL_DATABASE survket_db

COPY ./init-scripts/ /docker-entrypoint-initdb.d/
