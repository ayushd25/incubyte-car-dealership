# AI Prompt History

This document provides a summary of how AI tools were used during the development of **Incubyte Motors**.

Rather than copying entire conversations, it highlights the major prompts that influenced the project. All AI-generated suggestions were reviewed, modified where necessary, tested, and manually integrated into the final implementation.

---

# Project Planning

### Prompt

> Design a scalable full-stack architecture for a car dealership inventory management system using React, Express, TypeScript, and MongoDB.

**Used for**

- Planning the overall project structure
- Defining frontend and backend architecture
- Organising folders and development phases

---

# Authentication

### Prompt

> Implement secure JWT authentication with role-based authorization.

**Used for**

- User registration and login
- Password hashing with bcrypt
- JWT generation and verification
- Protected routes
- Admin and customer roles

---

# Vehicle Inventory

### Prompt

> Design REST APIs for vehicle inventory management.

**Used for**

- Vehicle CRUD operations
- Inventory validation
- Vehicle schema design
- Admin-only operations

---

### Prompt

> Implement a purchase workflow that automatically updates stock.

**Used for**

- Purchase endpoint
- Quantity reduction
- Out-of-stock validation
- Inventory updates

---

### Prompt

> Add an inventory restocking feature.

**Used for**

- Restock endpoint
- Quantity updates
- Admin permissions

---

# Frontend

### Prompt

> Build a modern React dashboard using Tailwind CSS.

**Used for**

- Dashboard layout
- Authentication pages
- Vehicle cards
- Responsive design
- UI improvements

---

# Validation

### Prompt

> Validate API requests using Zod.

**Used for**

- Request validation
- Error responses
- Input sanitisation

---

# Debugging

During development, AI was frequently used to troubleshoot issues such as:

- JWT authentication
- Axios API requests
- MongoDB connection problems
- Express middleware
- React state management
- TypeScript errors

The suggestions were used as debugging guidance rather than direct fixes.

---

# Testing

### Prompt

> Design backend tests using Jest and Supertest.

**Used for**

- Authentication tests
- CRUD tests
- Purchase workflow
- Restock workflow
- Authorization testing
- Edge case identification

---

# Documentation

AI also assisted in preparing project documentation.

Examples include:

- README
- API documentation
- Architecture documentation
- Testing documentation
- AI usage report
- Changelog

All documentation was reviewed and edited before submission.

---

# Summary of AI Assistance

| Area | Used |
|------|:----:|
| Project Planning | ✅ |
| Architecture Discussions | ✅ |
| Authentication | ✅ |
| Backend Development | ✅ |
| Frontend Development | ✅ |
| Debugging | ✅ |
| Testing | ✅ |
| Documentation | ✅ |

---

# Human Contribution

The following work was completed manually:

- Project setup
- Backend implementation
- Frontend implementation
- Business logic
- API integration
- Database configuration
- Testing
- Bug fixing
- UI refinement
- Final documentation review
- Git version control

All final implementation decisions remained the responsibility of the developer.

---

# Transparency Statement

AI was used as a development assistant throughout this project for brainstorming, implementation guidance, debugging, and documentation.

No AI-generated code or content was accepted without review. Every implementation was understood, tested, and adapted before being incorporated into the project.

This document is provided to maintain transparency regarding the use of AI during development.