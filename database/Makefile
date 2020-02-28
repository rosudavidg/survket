IMAGE_NAME=rosudavidg/survket-database
CONTAINER_NAME=survket-database

create_image:
	docker build -t $(IMAGE_NAME) .

create_container:
	docker run -d -p 3306:3306 --name $(CONTAINER_NAME) -e MYSQL_ROOT_PASSWORD=supersecret $(IMAGE_NAME)

attach_container:
	docker exec -it $(CONTAINER_NAME) bash

clean:
	docker container stop $(CONTAINER_NAME)
	docker container rm $(CONTAINER_NAME) -f
	docker image rm $(IMAGE_NAME) -f
