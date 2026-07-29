# REST API Documentation

## Overview

The backend of **Incubyte Motors** exposes a RESTful API built with **Express.js**, **TypeScript**, and **MongoDB Atlas**.

- **Base URL:** `http://localhost:5000/api`
- **Authentication:** JWT Bearer Token
- **Format:** JSON
- **Architecture:** REST

---

# Authentication

Protected endpoints require a valid JWT.

```http
Authorization: Bearer <JWT_TOKEN>
```

Tokens are returned after a successful login.

---

# Response Format

### Success

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error description"
}
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Access | Description |
|---------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Authenticate user |

---

## Vehicles

| Method | Endpoint | Access | Description |
|---------|----------|--------|-------------|
| GET | `/vehicles` | Public | Get all vehicles |
| GET | `/vehicles/:id` | Public | Get vehicle by ID |
| POST | `/vehicles` | Admin | Add vehicle |
| PUT | `/vehicles/:id` | Admin | Update vehicle |
| DELETE | `/vehicles/:id` | Admin | Delete vehicle |

---

## Inventory

| Method | Endpoint | Access | Description |
|---------|----------|--------|-------------|
| POST | `/vehicles/:id/purchase` | Authenticated | Purchase vehicle |
| POST | `/vehicles/:id/restock` | Admin | Restock vehicle |

---

# Example Requests

## Register

```http
POST /auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Login

```http
POST /auth/login
```

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## Add Vehicle

```http
POST /vehicles
```

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "category": "Sedan",
  "price": 35000,
  "quantity": 5,
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "mileage": 1200,
  "color": "White",
  "vin": "1HGCM82633A123456"
}
```

---

## Restock Vehicle

```http
POST /vehicles/:id/restock
```

```json
{
  "quantity": 5
}
```

---

# Access Control

| Feature | Customer | Admin |
|----------|:--------:|:-----:|
| View Vehicles | ✅ | ✅ |
| Purchase Vehicle | ✅ | ✅ |
| Add Vehicle | ❌ | ✅ |
| Update Vehicle | ❌ | ✅ |
| Delete Vehicle | ❌ | ✅ |
| Restock Vehicle | ❌ | ✅ |

---

# Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# Validation

Requests are validated using **Zod** before reaching the business logic.

Validation includes:

- Required fields
- Email format
- Password rules
- Vehicle details
- Inventory quantities
- Object ID validation

---

# Future Enhancements

Potential API improvements include:

- Vehicle image upload
- Pagination
- Advanced filtering
- Sales analytics
- Purchase history
- Notifications

---

# Conclusion

The API follows REST principles, uses JWT-based authentication, and provides a clean foundation for secure and scalable vehicle inventory management.