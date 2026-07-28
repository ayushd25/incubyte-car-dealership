import request from "supertest";
import app from "../../app";
import { User } from "../../models/user.model";

describe("POST /api/auth/register", () => {
  it("should register a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "ayush@example.com",
        password: "Password123",
      });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User registered successfully");
  });
  it("should reject request with missing fields", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({});

  expect(response.status).toBe(400);

  expect(response.body.success).toBe(false);
});
it("should persist the user in MongoDB", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "ayush@test.com",
      password: "password123",
    });

  const user = await User.findOne({
    email: "ayush@test.com",
  });

  expect(user).not.toBeNull();

  expect(user?.name).toBe("Ayush");
});
it("should reject registration with an existing email", async () => {
  const payload = {
    name: "Ayush",
    email: "duplicate@test.com",
    password: "password123",
  };

  await request(app)
    .post("/api/auth/register")
    .send(payload);

  const response = await request(app)
    .post("/api/auth/register")
    .send(payload);

  expect(response.status).toBe(409);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Email already exists");

  const users = await User.find({
    email: payload.email,
  });

  expect(users).toHaveLength(1);
});
});