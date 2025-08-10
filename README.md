# Movie Recommendations

A web application for movie recommendations built with React (frontend) and Django (backend).

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
  - [Environment Variables](#environment-variables)
  - [Development Setup](#development-setup)
  - [Docker Setup](#docker-setup)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Docker Mode](#docker-mode)
- [Accessing the Application](#accessing-the-application)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

## Overview

This project is a movie recommendations application that allows users to:
- Browse and search for movies
- Get personalized movie recommendations
- Create an account and manage preferences
- Rate and review movies

The application consists of:
- **Frontend**: React with TypeScript, built with Vite
- **Backend**: Django REST API
- **Database**: PostgreSQL

## Prerequisites

To run this project, you need to have the following installed:

- For development:
  - Node.js (v20 or later)
  - npm or yarn
  - Python 3.11 or later
  - pip
  - PostgreSQL

- For Docker setup:
  - Docker
  - Docker Compose

## Project Structure

```
movie-recommendations/
├── backend/                # Django backend
│   ├── movies/             # Movies app
│   ├── movie_backend/      # Django project settings
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── docker/                 # Docker configuration
│   ├── Dockerfile.backend  # Backend Docker configuration
│   ├── Dockerfile.frontend # Frontend Docker configuration
│   ├── entrypoint.backend.sh # Backend startup script
│   └── nginx.conf          # Nginx configuration
├── src/                    # React frontend
│   ├── assets/             # Static assets
│   ├── components/         # React components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── services/           # API services
│   └── types/              # TypeScript types
├── .env.example            # Example environment variables
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Node.js dependencies
└── README.md               # Project documentation
```

## Setup and Installation

### Environment Variables

1. Copy the example environment file to create your own:

```bash
cp .env.example .env
```

2. Edit the `.env` file and set the following variables:

```
# PostgreSQL Database Credentials
POSTGRES_DB=movie_db
POSTGRES_USER=your_postgres_username
POSTGRES_PASSWORD=your_postgres_password

# Django Backend Database Connection
DB_NAME=movie_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=db  # Use 'db' for Docker, 'localhost' for local development
DB_PORT=5432

# Django Settings
DEBUG=True
SECRET_KEY=your_secret_key_here
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_PASSWORD=your_admin_password
DJANGO_SUPERUSER_EMAIL=admin@example.com
```

### Development Setup

#### Frontend Setup

1. Install Node.js dependencies:

```bash
npm install
# or
yarn
```

#### Backend Setup

1. Create a Python virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

```bash
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Set up the database:

```bash
# Make sure PostgreSQL is running
python manage.py migrate
```

5. Create a superuser:

```bash
python manage.py createsuperuser
```

### Docker Setup

1. Make sure Docker and Docker Compose are installed.

2. Build the Docker images:

```bash
docker-compose build
```

## Running the Application

### Development Mode

#### Running the Frontend

```bash
# From the project root
npm run dev
# or
yarn dev
```

The frontend development server will start at http://localhost:5173.

#### Running the Backend

```bash
# Make sure your virtual environment is activated
cd backend
python manage.py runserver
```

The backend API will be available at http://localhost:8000.

### Docker Mode

To run the entire application using Docker:

```bash
docker-compose up
```

This will start all services:
- PostgreSQL database
- Django backend
- React frontend (served by Nginx)

To run in detached mode:

```bash
docker-compose up -d
```

To stop the services:

```bash
docker-compose down
```

## Accessing the Application

- **Frontend**: http://localhost (when using Docker) or http://localhost:5173 (in development mode)
- **Backend API**: http://localhost/api/ (when using Docker) or http://localhost:8000/api/ (in development mode)
- **Django Admin**: http://localhost/admin/ (when using Docker) or http://localhost:8000/admin/ (in development mode)

## Development Workflow

1. Start the backend and frontend in development mode.
2. Make changes to the code.
3. The frontend will automatically reload when you make changes.
4. For backend changes, you may need to restart the Django server.

## Troubleshooting

### Database Connection Issues

- Make sure PostgreSQL is running.
- Check that the database credentials in `.env` are correct.
- For Docker setup, ensure the `DB_HOST` is set to `db`.
- For local development, ensure the `DB_HOST` is set to `localhost`.

### Docker Issues

- If you encounter permission issues, try running Docker commands with `sudo` (on Linux/macOS).
- If services fail to start, check the logs with `docker-compose logs`.
- To rebuild the images after making changes to Dockerfiles, use `docker-compose build`.

### Frontend Issues

- If you encounter dependency issues, try deleting `node_modules` and reinstalling dependencies.
- Clear your browser cache if you see unexpected behavior.

### Backend Issues

- Check the Django logs for error messages.
- Make sure all migrations have been applied with `python manage.py migrate`.
- Verify that the environment variables are set correctly.