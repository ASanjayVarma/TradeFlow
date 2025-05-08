# 🛍️ Student Lending System – Frontend

This is the frontend of the **Point-Based Lending System for Students**, built with **Vite**, **React**, and **TypeScript**. Students can rent, borrow, or buy items using a point-based system. The app communicates with backend services for product listings and authentication.

## 🚀 Tech Stack

- ⚛️ React + TypeScript
- ⚡ Vite
- 🌐 Axios
- 💅 CSS / Tailwind

## 📁 Project Structure

src/
├── components/
├── pages/
├── services/         # Axios API handlers
├── App.tsx
├── main.tsx
└── ...

## 🛠️ Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo

### 2. Install Dependencies

npm install

### 3. Run the Development Server

npm run dev

### 4. Build for Production

npm run build

## 🌐 API & Environment Variables

Make a `.env` file in the root directory with the following:

```
VITE_BACKEND_API_BASE_URL=http://localhost:5000
VITE_BACKEND_API_PREFIX=/api

VITE_AUTH_API_BASE_URL=http://localhost:8080
VITE_AUTH_API_BASE_PREFIX=/api/auth

VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin

VITE_ADMIN_PRODUCT_TAGS=editors_choice,bestselling
```

## 📬 Contact

For any issues or contributions, feel free to open an issue or contact the maintainer.
