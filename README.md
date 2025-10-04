## Assignment for MagnetBrains (Task Management App)

 ### Backend Implementation Summary:
 
 * - Established the foundational backend structure for the application.
 * - Set up essential configurations, including environment variables and middleware.
 * - Implemented core API endpoints to handle client requests and responses.
 * - Integrated database connectivity for persistent data storage and retrieval.
 * - Added authentication and authorization mechanisms to secure endpoints.
 * - Developed error handling and logging for improved maintainability and debugging.
 * - Ensured modular code organization for scalability and ease of future enhancements.
 *
 * This documentation reflects the progress and key components implemented in the backend thus far.
 

 ### Frontend Implementation Summary:
 
 * - Established a centralized Axios instance for API communication with JWT support.
 * - Developed reusable UI components for tasks, forms, and pagination.
 * - Implemented global authentication state management using React Context.
 * - Structured main application screens for login, dashboard, and task operations.
 * - Defined TypeScript interfaces for robust type safety across entities.
 * - Set up routing with protected/private routes for authenticated access.
 * - Configured the React entry point for seamless app initialization.
 *
 * This documentation outlines the key architectural decisions and progress made in the frontend.
 */

# 🧠 Task Management App

A **modern, production-ready REST API** for managing tasks with authentication and CRUD operations.
Built with **Express.js (ESM)**, **MongoDB**, and **JWT Authentication**, this project showcases clean backend architecture and is deployable out of the box.

---

## 🚀 Features

* ✅ **User Authentication** – Secure register & login using JWT
* 📝 **Task Management** – Create, Read, Update, Delete tasks
* 🔐 **Protected Routes** – Middleware to validate tokens and user sessions
* 🌐 **CORS Enabled** – Ready to integrate with any frontend (React, Next.js, etc.)
* 🧩 **Modular Codebase** – ESM imports, separated routes, controllers, and models
* 🧪 **Tested Endpoints** – All major routes verified via Postman

---

## 🛠️ Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Language   | Node.js (ESM)                |
| Framework  | Express.js                   |
| Database   | MongoDB + Mongoose           |
| Auth       | JWT (JSON Web Tokens)        |
| Middleware | CORS, Custom Auth Middleware |

---

## 📁 Folder Structure

```
backend/
│
├── models/
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
├── index.js       <-- App setup & server start
└── package.json
```

> ✨ The project follows a clean separation of concerns (Model–Controller–Routes–Middleware), making it easy to extend for real-world production.

---

## 🧰 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/task-management-api.git
cd task-management-api

# Install dependencies
npm install

# Add your environment variables
touch .env
```

`.env` example:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

```bash
# Start the server
npm run dev
```

Visit 👉 `http://localhost:5000`
You should see: ✅ **Task Management API is running**

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | Login and get token |

### 📝 Tasks (Protected)

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/api/tasks`     | Create a new task      |
| GET    | `/api/tasks`     | Get all tasks          |
| PUT    | `/api/tasks/:id` | Update a specific task |
| DELETE | `/api/tasks/:id` | Delete a specific task |

> Use `Authorization: Bearer <token>` header for all task routes.

---

## 📌 Example Request

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"Finish Resume","description":"Polish backend project section"}'
```

---

## 🌟 Why This Project Stands Out

* ⚡ **Industry-standard structure** — Mirrors real-world Node.js production apps
* 🧠 **Clean & modular code** — Easy for teams to collaborate and extend
* 🧪 **Fully tested endpoints** — Demonstrates backend reliability
* 🛠️ **Ready for integration** — Works seamlessly with frontend frameworks

---

## 🎨 Frontend Overview

A **responsive React-based SPA** for managing tasks with authentication, CRUD operations, and seamless API integration. Built with **React (TypeScript)**, **Axios**, and **JWT-based auth**, the frontend demonstrates scalable architecture and modern UI practices.

---

### ⚡ Features

* 🔑 **JWT Authentication** – Secure login, registration, and session management
* 📝 **Task CRUD** – Create, view, update, and delete tasks
* 🛡️ **Protected Routes** – Only authenticated users can access dashboard and task screens
* 🧩 **Reusable Components** – Modular UI for tasks, forms, and pagination
* 🌐 **Centralized API Layer** – Axios instance with token handling
* 🧠 **Global State** – Auth and user context for consistent state management

---

### 🛠️ Tech Stack

| Layer      | Technology         |
| ---------- | ------------------ |
| Language   | TypeScript         |
| Framework  | React              |
| API Client | Axios              |
| Routing    | React Router DOM   |
| State      | React Context      |
| Styling    | CSS Modules / SCSS |

---

### 📁 Folder Structure

```
frontend/
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Screens (Login, Dashboard, etc.)
│   ├── context/         # Auth state management
│   ├── api/             # Axios instance & API calls
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main app entry
│   └── index.tsx        # React DOM render
└── package.json
```

> ✨ The frontend is organized for scalability, maintainability, and easy onboarding.

---

### 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/task-management-frontend.git
cd task-management-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Visit 👉 `http://localhost:3000`
You should see: ✅ **Task Management App UI**

---

### 🌟 Highlights

* 🧩 **Component-driven UI** — Fast development and easy reuse
* 🔒 **Secure API calls** — JWT stored and sent via Axios
* 🛠️ **Type-safe codebase** — TypeScript for reliability
* 🚦 **Protected navigation** — Authenticated routing for user safety


## 🧑‍💻 Author

**[Your Name](https://github.com/iamsaura8h)**
Full-stack Developer | MERN Stack | Open Source Contributor

