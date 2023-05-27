# Seller Platform Service

---

This microservice is responsible for managing seller products.
Nodejs + Typescript, Postgres, Pino Logger, Typeorm

## Prerequisites

Docker
Docker Compose

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository to your local machine.

```bash
git clone https://github.com/ronnahom96/seller-platform-backend
```

2. Navigate to the project directory.

```bash
cd seller-platform-backend
```

3. Build the Docker image.

```bash
docker build -t seller-platform-backend .
```

4. Navigate to the project directory.

```bash
docker-compose up
```

5. Access the app in your browser.
   Open your web browser and navigate to
   'http://localhost:3000' to access the app.

## Configuration

The app can be configured using environment variables. You can set these variables in the docker-compose.yml file.

DB_TYPE - Db Type, default to postgres
DB_USER - Db User
DB_HOST - DB Host
DB_NAME - DB Name
DB_PASSWORD - DB password
DB_PORT - DB default port
PORT: The port on which the app should listen. Defaults to 3000.

## Troubleshooting

If you encounter any issues while running the project, try the following steps:

Make sure Docker and Docker Compose are installed and running.
Check the console output for any error messages.
Check the logs for the containers by running docker-compose logs.
If all else fails, try deleting the containers and rebuilding the images with docker-compose down && docker-compose up --build.
License
This project is licensed under the MIT License.

## TODO

1. Unit tests
2. Integration tests
3. Add validations
4. Move logic to the service from the repository
5. Fix docker compose file

## API

Checkout the OpenAPI spec [here](/openapi.yaml)
