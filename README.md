# Vehicle Rental System

A college project with a React/Vite frontend and Spring Boot REST API. The backend uses a local H2 database by default, so no separate database server is needed to try the project.

## Requirements

- Java 21 or later
- Node.js 20.19+ or 22.12+

## Run the backend

From `backend/` run:

```sh
./mvnw spring-boot:run
```

The API starts at `http://localhost:8080/api`. The H2 database is saved under `backend/data/` and is created automatically. A demo administrator is seeded on first run: `admin@gmail.com` / `admin123`. The first run also adds sample vehicles. Register a customer from the app.

To use MySQL instead, set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` in the environment before starting the backend. Keep database credentials out of source control.

## Run the frontend

In another terminal, from `frontend/` run:

```sh
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Features

- Customer registration and login
- Editable customer profile (name, email, phone, and optional password change)
- Browse vehicles and submit rental requests with a date range
- View booking history
- Admin vehicle, customer, and booking screens
- Booking approval and rejection

The profile API keeps the existing password when the password field is left blank and stores new passwords as BCrypt hashes. This is a learning/demo application: the administrator credentials are intentionally simple, and production deployment needs proper server-side authentication/authorization, stronger account recovery, and database secrets management.
