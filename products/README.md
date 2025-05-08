# 🧠 Student Lending System – Backend

This is the backend for the **Point-Based Lending System for Students**, built with **Express.js**, **Node.js**, and **MySQL**. It provides REST APIs for user authentication, product management, and system operations.

---

## 🚀 Tech Stack

- 🟩 Node.js
- ⚙️ Express.js
- 🗃️ MySQL
- 🔐 JWT for authentication
- 📫 REST APIs

---


## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo

### 2. Install Dependencies

npm install

### 3. Setup Environment Variables

Create a `.env` file:

```
PORT=5000
IMAGE_PATH=http://localhost:5000/api/images
ENABLE_ADMIN=true
IGNORE_IMAGE_FOLDERS=temp,.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student_lending

```

### 4. Run the Server

```bash
node server.js
```

---

## 📬 API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Products

- `GET /api/products`
- `POST /api/admin/add-product`
- `PUT /api/admin/update-product/:id`
- `DELETE /api/admin/delete-product/:id`

### System

- `GET /actuator/health`

---

## 🧪 Testing

Use Postman or curl to test the APIs locally.

---

## 🔒 Notes

- JWT tokens are used for protected routes.
- Ensure MySQL server is running before starting the backend.

