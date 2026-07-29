# Testing Documentation

## Overview

Testing is an essential part of **Incubyte Motors** to ensure that the application's core functionality behaves correctly and remains reliable as new features are added.

The backend is tested using **Jest** and **Supertest**, with integration tests covering authentication, authorization, inventory management, request validation, and business logic.

---

# Testing Stack

| Tool | Purpose |
|------|---------|
| Jest | Test runner and assertions |
| Supertest | API integration testing |
| TypeScript | Type-safe test development |
| MongoDB Atlas | Database operations during testing |

---

# Running the Tests

From the backend directory:

```bash
cd backend

npm test
```

---

# Test Summary

| Metric | Result |
|---------|--------|
| Test Framework | Jest |
| API Testing | Supertest |
| Test Suites | **15** |
| Total Tests | **25** |
| Passing Tests | **25** |
| Failed Tests | **0** |

All tests passed successfully before submission.

---

# Test Coverage

The automated test suite validates the following functionality.

## Authentication

- User registration
- User login
- Duplicate email handling
- Invalid credentials
- JWT authentication
- Missing or invalid tokens

---

## Authorization

Role-based access control ensures only administrators can perform privileged operations.

Covered scenarios include:

- Customer cannot add vehicles
- Customer cannot edit vehicles
- Customer cannot delete vehicles
- Customer cannot restock inventory
- Administrator has full access

---

## Vehicle Management

CRUD operations are verified through integration tests.

- Create vehicle
- Retrieve vehicles
- Retrieve vehicle by ID
- Update vehicle
- Delete vehicle

---

## Purchase Workflow

Tests validate inventory behaviour during purchases.

- Successful purchase
- Quantity decreases automatically
- Out-of-stock purchases are rejected
- Invalid vehicle IDs return appropriate errors

---

## Inventory Restocking

The restock workflow verifies:

- Quantity increases correctly
- Invalid quantities are rejected
- Only administrators can restock vehicles

---

## Request Validation

Validation tests ensure invalid requests are handled correctly.

Examples include:

- Missing required fields
- Invalid email addresses
- Invalid object IDs
- Invalid quantities
- Incorrect data types

---

# Testing Approach

The project primarily uses **integration testing**, exercising the complete request lifecycle.

```text
HTTP Request
      │
      ▼
Express Route
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Business Logic
      │
      ▼
MongoDB
      │
      ▼
HTTP Response
```

This verifies that all layers of the application work together correctly rather than testing isolated functions.

---

# Example Test Cases

| Scenario | Expected Result |
|----------|-----------------|
| Register user | Account created |
| Login | JWT returned |
| Duplicate registration | Error response |
| Add vehicle | Vehicle created |
| Update vehicle | Vehicle updated |
| Delete vehicle | Vehicle removed |
| Purchase vehicle | Quantity decreases |
| Purchase out-of-stock vehicle | Request rejected |
| Restock vehicle | Quantity increases |
| Unauthorized admin action | Forbidden |

---

# Error Scenarios Tested

The test suite also validates common failure cases:

- Missing JWT token
- Invalid JWT token
- Unauthorized access
- Duplicate user registration
- Invalid request payload
- Vehicle not found
- Invalid vehicle ID
- Purchase with insufficient stock
- Invalid restock quantity

---

# Benefits

Automated testing provides several advantages:

- Detects regressions quickly
- Improves confidence during refactoring
- Validates business logic
- Reduces manual testing effort
- Improves long-term maintainability

---

# Future Improvements

Potential additions include:

- React Testing Library
- Cypress or Playwright
- Code coverage reporting
- GitHub Actions CI
- End-to-end testing
- Performance and load testing

---

# Conclusion

The automated test suite confirms that the application's authentication, authorization, inventory management, and purchasing workflows behave as expected.

With **15 passing test suites** and **25 successful test cases**, the project demonstrates a reliable backend foundation that can be extended with additional features in the future.