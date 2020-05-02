.PHONY: start init stop backend database frontend email

restart: stop close init all

all: backend database email frontend start

init:
	docker swarm init

start:
	docker stack deploy -c docker-compose.yml survketapp

backend:
	docker build -t survket_backend ./backend/.

database:
	docker build -t survket_database ./database/.

email:
	docker build -t survket_email ./email/.

frontend:
	docker build -t survket_frontend ./frontend/.

stop:
	docker stack rm survketapp

close:
	docker swarm leave --force
