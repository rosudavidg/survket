IMAGE_NAME=rosudavidg/survket-database
CONTAINER_NAME=survket-database

all: create_image create_container

create_container:
	docker run -p 33070:3306 --name $(CONTAINER_NAME) -e MYSQL_ROOT_PASSWORD=supersecret -d $(IMAGE_NAME)

attach_container:
	docker exec -it $(CONTAINER_NAME) bash

clean:
	docker container stop $(CONTAINER_NAME)
	docker container rm $(CONTAINER_NAME) -f
	docker image rm $(IMAGE_NAME) -f
