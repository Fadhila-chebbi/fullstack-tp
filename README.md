# FullStackPro — Full Stack Web Application

## Project Overview

This repository contains the practical work for TP1 and TP3.

- **TP1:** Frontend applications developed with Angular and Next.js.
- **TP3:** Full-stack application using Angular, Express.js, MongoDB and JWT authentication.

## Technologies Used

- Angular and TypeScript
- Next.js
- Node.js and Express.js
- MongoDB Atlas and Mongoose
- JWT (JSON Web Tokens)
- bcrypt for password hashing
- Git and GitHub
- Render for deployment

## Project Structure

- `ngapp/` — Angular application and Express backend.
- `ngapp/backend/` — Express API, MongoDB models and authentication.
- `nxapp/` — Next.js application.

## TP1 Features

- Home page
- Login page with form validation
- Contact page with form validation
- Navigation between pages

## TP3 Features

- MongoDB database connection
- Mongoose models for users and services
- Persistent data storage
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes for creating, updating and deleting services
- Public endpoint for retrieving services
- Frontend and backend deployment on Render

## Deployment

**Frontend:**  
https://tp3-angular-frontend.onrender.com

**Backend API:**  
https://tp3-angular-backend.onrender.com

**Health endpoint:**  
https://tp3-angular-backend.onrender.com/api/health

## How to Run the Angular Application

```bash
cd ngapp
npm install
npx ng serve
```

Open http://localhost:4200.

## How to Run the Next.js Application

```bash
cd nxapp
npm install
npm run dev
```

Open http://localhost:3000.

## How to Run the Backend

Open a terminal and execute:

```bash
cd ngapp/backend
npm install
npm run dev
```

Configure the required environment variables in a local `.env` file.

- `PORT`: Backend port.
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret used to sign JWT tokens.

Never commit passwords, database credentials or JWT secrets to GitHub.

## Authentication and API Security

The backend uses JWT authentication to protect sensitive service-management routes. Passwords are hashed using bcrypt before being stored.

Protected routes require a valid bearer token in the request's `Authorization` header.

## Testing

The following features were tested during development:

- User registration and login
- JWT token generation
- Rejection of protected requests without a token
- Successful creation of a service with a valid token
- MongoDB connectivity
- Frontend and backend deployment

## GitHub Repository

https://github.com/Fadhila-chebbi/fullstack-tp

npm run dev

Open http://localhost:3000.

## GitHub Repository
https://github.com/Fadhila-chebbi/fullstack-tp
