# System Architecture

## Overview

**Incubyte Motors** follows a layered client-server architecture that separates the frontend, backend, business logic, and database into independent layers. This separation improves maintainability, scalability, and testability while keeping the codebase easy to extend.

### Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Express.js + TypeScript
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **Communication:** REST APIs over HTTP

---

# High-Level Architecture

```text
                 Browser
                    │
                    ▼
      React + TypeScript Frontend
                    │
             Axios HTTP Requests
                    │
                    ▼
           Express REST API
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
 Authentication  Vehicle APIs   Middleware
                    │
                    ▼
             Business Services
                    │
                    ▼
             Mongoose Models
                    │
                    ▼
              MongoDB Atlas
```

---

# Project Structure

```text
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
└── utils/

frontend/
├── components/
├── pages/
├── context/
├── services/
└── routes/
```

---

# Frontend Architecture

The frontend is a React Single Page Application (SPA) responsible for rendering the user interface and communicating with the backend.

### Responsibilities

- User authentication
- Client-side routing
- Vehicle management
- Form validation
- API communication
- Responsive user interface

### Frontend Flow

```text
Pages
   │
Components
   │
Services
   │
Axios
   │
REST API
```

React Context is used to manage authentication state, while API requests are handled through reusable service modules.

---

# Backend Architecture

The backend follows a layered architecture to keep responsibilities clearly separated.

```text
Routes
   │
Controllers
   │
Services
   │
Models
   │
MongoDB
```

### Layer Responsibilities

| Layer | Responsibility |
|--------|----------------|
| Routes | Define API endpoints |
| Controllers | Handle HTTP requests and responses |
| Services | Business logic |
| Models | Database interaction |
| Middleware | Authentication, authorization and validation |

This structure keeps controllers lightweight while centralising business logic inside the service layer.

---

# Authentication & Authorization

Authentication is implemented using **JSON Web Tokens (JWT)**.

### Authentication Flow

```text
User Login
      │
Password Verification
      │
JWT Generated
      │
Frontend Stores Token
      │
Protected Request
      │
JWT Middleware
      │
Authorised Response
```

Role-based authorization restricts inventory management operations to administrators.

Protected actions include:

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Restock Inventory

---

# Request Lifecycle

A typical request follows this flow:

```text
User Action
      │
React Component
      │
Axios Request
      │
Express Route
      │
Middleware
      │
Controller
      │
Service
      │
MongoDB
      │
Response
      │
UI Update
```

This separation makes each layer easier to test and maintain.

---

# Database Design

The application currently uses two collections.

```text
MongoDB
│
├── users
└── vehicles
```

### User

- Name
- Email
- Password (hashed)
- Role

### Vehicle

- Make
- Model
- Year
- Category
- Price
- Quantity
- Mileage
- Fuel Type
- Transmission
- Colour
- VIN
- Status
- Created By

---

# Security

Security measures implemented in the project include:

- JWT Authentication
- Password hashing with bcrypt
- Role-based authorization
- Zod request validation
- Environment variables
- Protected routes
- Consistent error handling

---

# Design Decisions

| Decision | Reason |
|----------|--------|
| React + TypeScript | Component-based UI with type safety |
| Express.js | Lightweight REST API framework |
| MongoDB Atlas | Flexible cloud-hosted database |
| Mongoose | Schema validation and database abstraction |
| JWT | Stateless authentication |
| Zod | Runtime request validation |
| Service Layer | Separation of business logic |
| React Context | Simple authentication state management |

---

# Future Improvements

The current architecture can be extended with:

- Docker
- CI/CD
- Redis caching
- Image storage
- Payment integration
- Activity logging
- Notifications
- Microservices

---

# Conclusion

The architecture of **Incubyte Motors** is designed to be modular, secure, and easy to maintain. By separating the frontend, backend, business logic, and data layers, the project provides a clean foundation for future development while remaining simple enough to understand and extend.