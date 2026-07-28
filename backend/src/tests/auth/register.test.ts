import request from "supertest";
import app from "../../app";
import { User } from "../../models/user.model";
import bcrypt from "bcrypt";

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
it("should hash the password before saving the user", async () => {
  const payload = {
    name: "Ayush",
    email: "secure@test.com",
    password: "password123",
  };

  await request(app)
    .post("/api/auth/register")
    .send(payload);

  const user = await User.findOne({
    email: payload.email,
  });

  expect(user).not.toBeNull();

  // The stored password should NOT be the original password
  expect(user!.password).not.toBe(payload.password);

const isMatch = await bcrypt.compare(
  payload.password,
  user!.password
);

expect(isMatch).toBe(true);
});
it("should return a JWT token after successful registration", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "jwt@test.com",
      password: "password123",
    });

  expect(response.status).toBe(201);

  expect(response.body.data.user).toBeDefined();

expect(response.body.data.token).toBeDefined();

expect(typeof response.body.data.token).toBe("string");
});
});