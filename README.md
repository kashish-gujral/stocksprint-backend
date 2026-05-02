# 🚀 StockSprint – Backend (Kashish's Contribution)

## 📌 Overview

StockSprint is a backend system designed to manage products, inventory, and orders efficiently.
This module focuses on authentication, product handling, and core API logic.

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Postman (API Testing)

---

## 🔐 Features Implemented

### ✅ Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### 📦 Product Management

* Create Product
* Get All Products
* Update Product
* Delete Product

### 📊 Inventory Management

* Track product stock
* Update inventory levels

### 🧾 Order System

* Create Orders
* Manage Order Data

---

## 🗂️ Project Structure

```
stocksprint/
│── config/
│   └── db.js
│── controllers/
│── middleware/
│── models/
│── routes/
│── .env
│── package-lock.json
│── package.json
│── server.js
```

---

## 🚀 Setup Instructions

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Configure environment variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 3️⃣ Run the server

```
npm run dev
```

---

## 🧪 API Testing (Postman)

### 🔹 Register

POST `/api/auth/register`

### 🔹 Login

POST `/api/auth/login`

### 🔹 Get Current User

GET `/api/auth/me`

### 🔹 Products CRUD

* POST `/api/products`
* GET `/api/products`
* PUT `/api/products/:id`
* DELETE `/api/products/:id`

---

## 🧠 My Contribution

* Implemented authentication system (JWT)
* Built REST APIs for products and users
* Integrated middleware for route protection
* Structured backend architecture
* Added utility-based business logic

---

## ⚠️ Notes

* MongoDB Atlas may face network issues; local MongoDB recommended for testing
* Ensure `.env` is configured properly

---

## ✨ Future Improvements

* Add payment integration
* Improve role-based access control
* Optimize database queries

---

## 👩‍💻 Author
**Kashish Gujral**

Kashish
