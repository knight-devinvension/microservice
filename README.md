# 📌 Full-Stack Microservices Project

This project is a **full-stack microservices** application using:
- **Lumen (PHP)** → REST API with JWT Authentication & MySQL  
- **Node.js (TypeScript)** → REST API with Redis Caching  
- **React (Vite + TypeScript)** → Frontend consuming APIs  
- **Redis** → Caching for fast API responses  
- **MySQL** → Relational Database for Lumen API  
- **Docker & Docker Compose** → Containerized environment  
- **GitHub Actions** → CI/CD for automated testing, build, and deployment  


## 🚀 Getting Started

### 🔹 Prerequisites
- **Docker** installed → [Download](https://www.docker.com/get-started)
- **Node.js (v18+)** → [Download](https://nodejs.org/)
- **Composer** (for Lumen) → [Download](https://getcomposer.org/)

### 🔹 Environment Variables
Copy `.env.example` to `.env` inside each microservice.

#### 📌 Lumen Backend (`backend-lumen/.env`)
```
APP_NAME=Lumen
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=lumen_db
DB_USERNAME=root
DB_PASSWORD=root
JWT_SECRET=your_jwt_secret_key

```


## 🛠 Running the Project
```
docker-compose up --build -d
docker-compose exec lumen php artisan migrate
```

This will:

- Build & run the backend services (Lumen + Node.js)
- Run MySQL & Redis
- Build & serve the frontend

# 📌 Full-Stack Microservices Project

This project is a **full-stack microservices** application using:
- **Lumen (PHP)** → REST API with JWT Authentication & MySQL  
- **Node.js (TypeScript)** → REST API with Redis Caching  
- **React (Vite + TypeScript)** → Frontend consuming APIs  
- **Redis** → Caching for fast API responses  
- **MySQL** → Relational Database for Lumen API  
- **Docker & Docker Compose** → Containerized environment  
- **GitHub Actions** → CI/CD for automated testing, build, and deployment  

---

## 🚀 Access the Application

| Service       | URL                     |
|--------------|-------------------------|
| **Frontend**  | [http://localhost:3000](http://localhost:3000) |
| **Lumen API** | [http://localhost:8000](http://localhost:8000) |
| **Node API**  | [http://localhost:4000](http://localhost:4000) |
| **MySQL**     | `localhost:3306`        |
| **Redis**     | `localhost:6379`        |

---

## 🔍 API Endpoints

### **🔹 Lumen API (PHP)**

| Method | Endpoint     | Description       | Auth Required |
|--------|-------------|-------------------|--------------|
| `POST` | `/register` | Register a user   | ❌ No        |
| `POST` | `/login`    | User login (JWT)  | ❌ No        |
| `GET`  | `/posts`    | Fetch all posts   | ❌ No        |
| `POST` | `/posts`    | Create a new post | ✅ Yes       |
| `PUT`  | `/posts/:id` | Update a post    | ✅ Yes       |
| `DELETE` | `/posts/:id` | Delete a post | ✅ Yes       |

---
