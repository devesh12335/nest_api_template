<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->



# NestJS TypeORM Project Template

This project is built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/), leveraging a secure, modular, and scalable backend structure. It provides robust features such as JWT authentication with refresh tokens, RESTful architecture, and seamless file uploads. The backend connects to a PostgreSQL database, making it suitable for production-grade applications. The setup process is Docker-friendly, enabling fast and efficient deployment.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modular Structure**: Designed with a modular approach for scalability, maintainability, and easy expansion.
- **Secure JWT Authentication**: Implemented access and refresh tokens to ensure secure user sessions.
- **RESTful Architecture**: Follows REST principles for a clean and predictable API design.
- **File Uploads**: Supports file upload functionality with base URL embedding in the response.
- **PostgreSQL Database**: Uses PostgreSQL with TypeORM for a reliable and high-performance database layer.
- **Docker Integration**: Provides easy Docker setup for quick development and deployment.

## Project Structure

```plaintext
src/
├── auth/               # JWT authentication module
├── common/             # Common utilities and constants
├── config/             # Configuration and environment settings
├── database/           # TypeORM entities, migrations, seeds
├── modules/            # Feature-specific modules (e.g., User, Product)
├── uploads/            # File upload storage
├── main.ts             # Application entry point
├── app.module.ts       # Root application module
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/) (if running locally without Docker)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devesh12335/nest_api_template.git
   cd nestjs-typeorm-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Docker Setup

This project provides a `Dockerfile` and a `docker-compose.yml` file for easy setup and deployment.

### Build and Run with Docker Compose

1. Build and start the containers:

   ```bash
   docker-compose up --build
   ```

2. Verify that the app is running:

   - Access the app at [http://localhost:3000](http://localhost:3000).
   - The PostgreSQL database will be available on port 5432.

3. To stop the containers:

   ```bash
   docker-compose down
   ```

### Key Docker Commands

- **Rebuild the container**: `docker-compose build`
- **Run migrations**: `docker-compose exec app npm run typeorm migration:run`
- **Run seeds**: `docker-compose exec app npm run seed`

## Environment Variables

Copy `.env.example` to `.env` and update the variables as needed:

```plaintext
# Application
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600
JWT_REFRESH_SECRET=your_refresh_jwt_secret
JWT_REFRESH_EXPIRATION=86400
```

## Running the App

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

## TO Generate new module
nest generate resource products

## API Documentation

This project uses [Swagger](https://swagger.io/) for API documentation. After starting the app, visit [http://localhost:3000/docs](http://localhost:3000/docs) to view the documentation.

## Key Commands

| Command                      | Description                                  |
|------------------------------|----------------------------------------------|
| `npm run start`              | Starts the app in development mode           |
| `npm run build`              | Compiles the app                            |
| `npm run start:prod`         | Runs the compiled app                       |
| `npm run migration:run`      | Runs all migrations                         |
| `npm run migration:generate` | Generates a new migration                   |
| `npm run seed`               | Runs the seeding scripts                    |

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bug fixes or feature requests.

## License

This project is licensed under the MIT License.


