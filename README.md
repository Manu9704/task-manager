# Task Manager Web Application

A complete **Full-Stack Task Management System** built using **React**, **Material UI**, **Node.js**, **Express.js**, and **MongoDB**, featuring secure JWT authentication and role-based access control (Admin/User).

This application provides an intuitive interface for managing tasks along with a fully deployed backend API.

---

## 🚀 Live Demo

### 🔹 Frontend (Vercel)
👉 https://task-manager-git-main-manohar-bandarus-projects.vercel.app

### 🔹 Backend API (Render)
👉 https://task-manager-4rmo.onrender.com/api

---

## 📦 Tech Stack

### **Frontend**
- React (Create React App)
- Material UI (MUI)
- Axios for API communication
- React Router
- Context API (Auth, Theme, Notifications)
- Framer Motion animations

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (Password Hashing)
- CORS configured for production

---

## 📁 Project Structure

task-manager/
│
├── task_manager_backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── config/
│ ├── index.js
│ └── package.json
│
├── task_manager-frontend/
│ ├── public/
│ ├── src/
│ │ ├── api/axios.js
│ │ ├── components/
│ │ ├── contexts/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
│
└── README.md



# 🔐 Environment Variables

## **Backend (.env on Render)**

MONGO_URI = mongodb+srv://ManoharBandaru:9704621960@cluster0.blv77.mongodb.net/
JWT_SECRET = mysecretvalue
FRONTEND_URL=https://task-manager-git-main-manohar-bandarus-projects.vercel.app


## **Frontend (Vercel → Project Settings → Environment Variables)**

REACT_APP_API_BASE_URL=https://task-manager-4rmo.onrender.com/api


⚠️ `.env` files should **not** be committed to GitHub.

---

# ▶️ Running the Project Locally

## 1️⃣ Clone the repository

git clone https://github.com/Manu9704/task-manager.git
cd task-manager


🔧 Backend Setup

cd task_manager_backend
npm install
Create .env file:

MONGO_URI=your_local_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
Run backend:

npm run dev
Backend runs at:http://localhost:5000

Frontend Setup

cd task_manager-frontend
npm install
Create .env file:


REACT_APP_API_BASE_URL=http://localhost:5000/api
Run frontend:

npm start
Frontend runs at: http://localhost:3000

API Routes
Authentication

POST /api/auth/signup
POST /api/auth/login


Task Routes

GET    /api/tasks/getAllTasks?page=1&limit=9
GET    /api/tasks/getTask/:id
POST   /api/tasks/addTask
PUT    /api/tasks/updateTask/:id
DELETE /api/tasks/deleteTask/:id

User Roles

User
Create tasks
View only their tasks
Edit their tasks
Cannot delete others’ tasks

Admin
View all tasks
Delete any task

Features
✔ JWT Authentication
✔ Admin & User Role Management
✔ CRUD Task Operations
✔ Pagination
✔ Fully Responsive UI
✔ Material UI Components
✔ Dark/Light Theme Toggle
✔ Notification Alerts
✔ Smooth animations
✔ Deployed Frontend & Backend

Contributing
Suggestions and pull requests are welcome!

License
This project is licensed under the MIT License.

Acknowledgements

Developed as part of a full-stack case study.
Special thanks to reviewers and mentors.