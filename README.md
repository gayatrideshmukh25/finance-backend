# 💰 Finance Backend API

A backend system for managing financial records with **role-based access control**, built using **Node.js, Express, and MySQL**.

---

## 🚀 Features

### 🔐 1. Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Roles:
  - **Admin** → Full access
  - **Analyst** → Can view and create records
  - **Viewer** → Can only view dashboard

---

### 👤 2. User Management

- Create, update, delete users (Admin only)
- Assign roles (admin / analyst / viewer)
- Manage user status (active / inactive)

---

### 💳 3. Financial Records Management

- Create, read, update, delete records
- Fields:
  - amount
  - type (income / expense)
  - category
  - description
  - user_id

- Filter records by:
  - type
  - category
  - date

---

### 📊 4. Dashboard APIs

- Total Income
- Total Expenses
- Net Balance
- Category-wise totals
- Recent activity
- Monthly trends

---

### 🔒 5. Access Control

| Action                | Viewer | Analyst        | Admin |
| --------------------- | ------ | -------------- | ----- |
| View Dashboard        | ✅     | ✅             | ✅    |
| View Records          | ❌     | ✅             | ✅    |
| Create Records        | ❌     | ✅ (self only) | ✅    |
| Update/Delete Records | ❌     | ❌             | ✅    |
| Manage Users          | ❌     | ❌             | ✅    |

---

## 🏗️ Project Structure

```
src/
  config/         # Database configuration
  controllers/    # API controllers
  models/         # Database models (BaseModel, User, Record)
  routes/         # Route definitions
  middleware/     # Auth & RBAC middleware
  utils/          # Helper functions
  server.js       # Entry point
```

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- bcrypt (password hashing)

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd finance-backend
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=finance_db
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 4. Setup Database

Run your `schema.sql` file:

```
mysql -u root -p finance_db < schema.sql
```

---

### 5. Start Server

```
npm start
```

---

## 🔑 Default Admin

Make sure to create an admin user manually or via seed script.

---

## 📡 API Endpoints

### 🔐 Auth

- `POST /auth/login`
- `POST /auth/logout`

---

### 👤 Users (Admin Only)

- `POST /users`
- `GET /users`
- `PUT /users/:id`
- `DELETE /users/:id`

---

### 💳 Records

- `POST /records`
- `GET /records`
- `PUT /records/:id`
- `DELETE /records/:id`

---

### 📊 Dashboard

- `GET /dashboard`
- `GET /dashboard/summary`
- `GET /dashboard/analytics`

---

## 🔍 Example Request

### Create Record (Admin)

```json
{
  "username": "amit",
  "amount": 3000,
  "type": "expense",
  "category": "food",
  "description": "Lunch"
}
```

---

## 🧠 Key Design Decisions

- Used a **BaseModel** for reusable CRUD operations
- Implemented **role-based middleware** for access control
- Associated records with users using `user_id`
- Handled validation and error responses properly

---

## 🚀 Optional Enhancements

- Pagination
- Search functionality
- Soft delete
- API documentation (Swagger)
- Unit testing

---

## 📌 Conclusion

This project demonstrates a scalable backend design with:

- Clean architecture
- Secure authentication
- Role-based access control
- Real-world financial data handling

---

## 👨‍💻 Author

Tanmay Deshmukh
