IMAGE_NAME=rosudavidg/survket-backend
CONTAINER_NAME=survket-backend

all: create_image create_container

create_image:
	docker build -t $(IMAGE_NAME) .

create_container:
	docker run -p 8888:5000 --name $(CONTAINER_NAME) -d $(IMAGE_NAME)

attach_container:
	docker exec -it $(CONTAINER_NAME) bash

clean:
	docker container stop $(CONTAINER_NAME)
	docker container rm $(CONTAINER_NAME) -f
	docker image rm $(IMAGE_NAME) -f
