# Finance Backend API

A backend system for managing financial records with role-based access control (RBAC), built using Node.js, Express, and MySQL.

### Tech Stack

- Node.js
- Express.js
- MySQL (mysql2)
- JWT Authentication
- bcrypt (password hashing)

### User Management

- Create, update, delete users (Admin only)
- Assign roles (admin / analyst / viewer)
- Manage user status (active / inactive)

### Financial Records Management

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

### Dashboard APIs

- Total Income
- Total Expenses
- Net Balance
- Category-wise totals
- Recent activity
- Monthly trends
- Weekly trnds

---

### Access Control

| Action                | Viewer | Analyst | Admin |
| --------------------- | ------ | ------- | ----- |
| View Dashboard        | ✅     | ✅      | ✅    |
| View Records          | ❌     | ✅      | ✅    |
| Create Records        | ❌     | ✅      | ✅    |
| Update/Delete Records | ❌     | ❌      | ✅    |
| Manage Users          | ❌     | ❌      | ✅    |

### Project Structure

src/
config/ # Database configuration
controllers/ # API controllers
models/ # Database models (BaseModel, User, Record , dashboard)
routes/ # Route definitions
middleware/ # Auth , Error & RBAC middleware
utils/ # Helper functions
server.js # Entry point

### Setup Instructions

# Clone the repository

    git clone <your-repo-url>
    cd finance-backend
    npm install

# Create .env file

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=finance_db
    JWT_SECRET=your_secret_key
    PORT=3000

# Setup Database

    mysql -u root -p finance  schema.sql

# Start Server

    node server.js

#### API Endpoints

# Auth

- POST /auth/login
- GET /auth/getProfile
- PUT /auth/updateProfile

# Users (Admin Only)

- POST /users → Create user
- GET /users → List users
- PUT /users/:id → Update user
- DELETE /users/:id → Delete user

# Records

- POST /records/create → Create record
- POST /records/getAll → List records
- GET /records/:id → get record by id
- PUT /records/:id → Update record
- DELETE /records/:id → Delete record

# Dashboard

- GET /dashboard → Overview
- GET /dashboard/summary → Summary totals
- GET /dashboard/analytics → Trends & insights
