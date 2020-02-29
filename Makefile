restart: close init

close:
	docker stack rm testapp
	docker swarm leave --force
init:
	docker swarm init
	docker stack deploy -c docker-compose.yml testapp
