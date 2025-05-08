# 🎓 Point-Based Lending System for University Students & Teachers

A full-stack web application that allows university students and teachers to **lend, rent, or borrow items** at minimal cost,. This initiative promotes sustainability and community sharing while making essential items more accessible within campus.

🔗 **[Live Demo](https://your-demo-link.com)**

---

## 🧠 Overview

This system is designed to help users within a university environment lend and borrow items (books, electronics, etc.) through a point-based model.

---

## ⚙️ Project Architecture

```
├── auth-service           # Spring Boot Microservice for Authentication
├── backend                # Express.js API for Products & System Routes
└── frontend               # Vite + React + TypeScript UI
```

---

## 🚀 Tech Stack

### 🔐 Auth Service
- Java, Spring Boot
- MongoDB
- JWT Authentication

### 🛠️ Backend API
- Node.js, Express.js
- MySQL
- RESTful APIs

### 🌐 Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios

---

## 📦 Setup Instructions

### 🔐 Auth Service

1. Navigate to `auth-service` directory.
2. Add a `.env` file:
    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret_key
    DB_URI=mongodb://localhost:27017/auth-service
    TOKEN_EXPIRY=1h
    ```
3. Run with:
    ```bash
    mvn spring-boot:run
    ```

### 🛠️ Backend

1. Navigate to `backend` directory.
2. Add a `.env` file:
    ```env
    PORT=5000
    IMAGE_PATH=http://localhost:5000/api/images
    ENABLE_ADMIN=true
    IGNORE_IMAGE_FOLDERS=temp,.env

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=student_lending
    ```
3. Install dependencies & run:
    ```bash
    npm install
    node server.js
    ```

### 🌐 Frontend

1. Navigate to `frontend` directory.
2. Add a `.env` file:
    ```env
    VITE_BACKEND_API_BASE_URL=http://localhost:5000
    VITE_BACKEND_API_PREFIX=/api

    VITE_AUTH_API_BASE_URL=http://localhost:8080
    VITE_AUTH_API_BASE_PREFIX=/api/auth

    VITE_ADMIN_USERNAME=admin
    VITE_ADMIN_PASSWORD=admin
    VITE_ADMIN_PRODUCT_TAGS=editors_choice,bestselling
    ```
3. Install dependencies & run:
    ```bash
    npm install
    npm run dev
    ```

---

## 📬 API Routes Summary

### Auth Service

- `POST /register`
- `POST /login`
- `GET /validate-token`
- `POST /logout`

### Backend

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/admin/add-product`
- `PUT /api/admin/update-product/:id`
- `DELETE /api/admin/delete-product/:id`
- `GET /actuator/health`

---

## 🔒 Notes

- All protected routes require a valid JWT token in the `Authorization` header.
- Use Postman or curl for testing APIs.

---

## 🤝 Contributing

Feel free to fork the repo and open PRs. For issues, create a GitHub issue or contact the maintainer.

---

© 2025 Point-Based Lending System Team. All rights reserved.