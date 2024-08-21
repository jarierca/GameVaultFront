# GameVault Frontend

## Overview

GameVault Frontend is the user interface for the GameVault application, built using React. This project uses Docker and Docker Compose to simplify development and deployment. GameVault Frontend is Free/Libre and Open Source Software (FLOSS) and is licensed under the GPLv3 License.

## Prerequisites

Ensure you have the following installed on your machine:

- Docker
- Docker Compose

## Configuration

The project relies on environment variables defined in the `.env` file for configuration. You should create a `.env` file in the root directory of the project with the following content:

```env
REACT_APP_API_URL=http://localhost:8080
```

This configuration points to the backend API URL for the GameVault application.

## Running the Project

### Using Docker Compose

To build and run the GameVault frontend with Docker Compose, follow these steps:

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/gamevault-frontend.git
   cd gamevault-frontend
   ```

2. **Create the `.env` File**

   Create a `.env` file in the root directory of the project with the necessary environment variables (see the Configuration section above).

3. **Build and Start the Containers**

   Use Docker Compose to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker image for the frontend and start the container.

4. **Access the Application**

   Once the containers are running, you can access the application in your web browser at:

   ```
   http://localhost:3000
   ```

### Stopping the Containers

To stop the running containers, use:

```bash
docker-compose down
```

This command will stop and remove the containers, but keep the images and volumes intact.

## Development

If you need to make changes to the project and want to see them reflected immediately:

1. Ensure your `.env` file is correctly configured.
2. Run `docker-compose up` as described above. Docker will watch for changes in your code and automatically rebuild the frontend container.

## Project Structure

- `Dockerfile`: Defines the Docker image for the frontend.
- `docker-compose.yml`: Defines the services, networks, and volumes for Docker Compose.
- `.env`: Environment variables configuration (you need to create this file).
- `src/`: Source code for the React application.
- `public/`: Public assets for the React application.

## License

This project is licensed under the GPLv3 License. See the [LICENSE](LICENSE) file for more details. 

## FLOSS Note

GameVault Frontend is Free/Libre and Open Source Software (FLOSS). You are encouraged to use, modify, and distribute the software under the terms of the GPLv3 License.

## Troubleshooting

- **Issues with Docker Compose**: Make sure Docker and Docker Compose are installed and running correctly. Check the Docker and Docker Compose documentation for more information on installation and usage.
- **Configuration Issues**: Ensure that the `.env` file is correctly created and located in the root directory of the project.

---

Feel free to adapt any of the sections as needed for your specific project details!
