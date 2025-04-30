# 🛠️ E-Commerce API (WIP)

**This project is currently under development.**

A RESTful API built to manage an e-commerce platform, featuring structured layers of authentication, business logic, and data persistence. This backend is designed to be scalable, secure, and easily integrable with modern frontend applications.

## 🚀 Features

- **User Authentication** — Powered by Firebase Authentication.
- **Company Management** — Create, read, update and delete companies.
- **Product Catalog** — Manage product listings and inventory.
- **Category Management** — Organize products into categories.
- **Order Management** — Handle customer orders with accurate tracking.
- **File Uploads** — Upload company logos and product images using Firebase Cloud Storage.
- **Input Validation** — Strong validation using Joi and Celebrate.
- **API Documentation** — Swagger-based auto-generated docs.

## 🧰 Tech Stack

- **Node.js**  
- **TypeScript**  
- **Express**  
- **Firebase**
  - Authentication  
  - Firestore  
  - Cloud Storage  
  - Cloud Functions  
- **Celebrate / Joi**  
- **Firebase Emulators**  
- **Swagger (OpenAPI)**  

## 🗄️ Database

This project uses **Cloud Firestore**, a NoSQL document database provided by Firebase.

- Designed for scalability, low-latency, and real-time syncing
- Collections and documents model aligned with business entities (e.g., users, companies, orders)
- Suitable for flexible schemas and rapid iteration cycles

## 📂 Project Structure

```text
src/
├── controllers/       # Route handlers (controllers)
├── routes/            # API route definitions
├── services/          # Business logic layer
├── repositories/      # Database interaction layer
├── middlewares/       # Error handling, auth guards, etc.
├── models/            # Data models and TypeScript interfaces
├── errors/            # Custom error classes
└── validations/       # Joi schemas for validation
```

## 👨‍💻 Developer Notes

This project aims to demonstrate strong backend development practices, including:

- Clean architecture with layered responsibilities  
- Full use of TypeScript with type safety  
- Real-world RESTful API patterns  
- Firebase integration in a cloud-ready environment
- Use of Firestore as a scalable NoSQL database for storing dynamic application data

## 📌 Status

**This project is currently under development.**  
More features and improvements will be added continuously.