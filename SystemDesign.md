# 📝 Task Manager

An open-source **Task Manager** application that allows users to efficiently create, update, prioritize, and track tasks with pagination and a clean modal-based UI.

---

## ✨ Features

* 📌 Create, edit, and delete tasks
* 🕒 Set due dates and priorities
* 🧭 Modal-based task editing for better UX
* 📄 Paginated task listing (5 tasks per page)
* 🌐 RESTful API with clean structure
* 🧠 System Design included

---

## 🏗 Tech Stack

**Frontend:** React + TypeScript + TailwindCSS
**Backend:** Node.js + Express + MongoDB
**Database:** MongoDB (Mongoose ODM)
**Other:** REST API, Pagination, Modal UI

---

## 🧠 System Design

```
                ┌────────────────────────┐
                │        Frontend        │
                │  React + TS + Tailwind│
                └────────────┬───────────┘
                             │
                    HTTP (REST API)
                             │
                ┌────────────┴───────────┐
                │        Backend         │
                │ Node.js + Express API │
                └────────────┬───────────┘
                             │
                        Mongoose ODM
                             │
                ┌────────────┴───────────┐
                │       MongoDB          │
                └────────────────────────┘
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install Dependencies

For both frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Run the Application

In two terminals:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)** 🚀

---

## 🤝 Contribution Guidelines

Contributions are welcome! 🎉
Please open an issue or submit a pull request for any feature, bug fix, or enhancement.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it.

---

### 🌟 Star this repo if you like it!

Your support motivates further development ❤️
