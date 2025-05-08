# Auth Service

The `auth-service` is a microservice responsible for handling user authentication and authorization in the e-commerce application. It provides APIs for user registration, login, token generation, and validation.

## Features

- User registration with secure password hashing.
- User login with JWT (JSON Web Token) generation.
- Token validation for protected routes.
- Logout functionality (if applicable).

## Routes

Below is a list of the main routes provided by the `auth-service`:

### 1. **POST /register**

- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Validation errors or user already exists.

### 2. **POST /login**

- **Description**: Authenticates a user and returns a JWT.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK`: Returns a JWT token.
  - `401 Unauthorized`: Invalid credentials.

### 3. **GET /validate-token**

- **Description**: Validates the provided JWT token.
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  - `200 OK`: Token is valid.
  - `401 Unauthorized`: Token is invalid or expired.

### 4. **POST /logout** (Optional)

- **Description**: Logs out the user by invalidating the token (if token blacklisting is implemented).
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  - `200 OK`: User successfully logged out.

## Environment Variables (.env)

The `auth-service` relies on a `.env` file for configuration. Below are the required environment variables:

- `PORT`: The port on which the service runs (e.g., `3000`).
- `JWT_SECRET`: The secret key used for signing JWT tokens.
- `DB_URI`: The connection string for the database (e.g., MongoDB URI).
- `TOKEN_EXPIRY`: The duration for which the JWT token is valid (e.g., `1h`, `7d`).

### Example `.env` File

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
DB_URI=mongodb://localhost:27017/auth-service
TOKEN_EXPIRY=1h
```

## How It Works

1. **User Registration**: When a user registers, their password is hashed using a secure algorithm (e.g., bcrypt) and stored in the database.
2. **User Login**: On login, the provided credentials are validated. If valid, a JWT token is generated and returned to the user.
3. **Token Validation**: Protected routes in other services can use the `/validate-token` endpoint to verify the authenticity of a user's token.
4. **Logout**: If implemented, the token is invalidated to prevent further use.

This service is designed to be modular and can be integrated with other microservices in the e-commerce application.
