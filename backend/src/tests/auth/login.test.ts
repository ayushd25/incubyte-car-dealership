import request from "supertest";
import app from "../../app";

describe("POST /api/auth/login", () => {
  it("should login successfully with valid credentials", async () => {
    const payload = {
      name: "Ayush",
      email: "ayush@test.com",
      password: "password123",
    };

    // Register first
    await request(app)
      .post("/api/auth/register")
      .send(payload);

    // Login
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: payload.email,
        password: payload.password,
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Login successful");

    expect(response.body.data.user.email).toBe(payload.email);

    expect(response.body.data.token).toBeDefined();
  });
});