import request from "supertest";
import app from "../../app";

describe("Authentication Middleware", () => {
  it("should allow access with a valid JWT", async () => {
    const payload = {
      name: "Ayush",
      email: "middleware@test.com",
      password: "password123",
    };

    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send(payload);

    const token = registerResponse.body.data.token;

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.email).toBe(payload.email);
  });
});