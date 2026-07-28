import request from "supertest";
import app from "../../app";

describe("POST /api/vehicles", () => {
  it("should create a vehicle successfully", async () => {
    // Register a user
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "vehicle@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    const payload = {
       make: "Toyota",
    model: "Fortuner",
    year: 2023,
    price: 35000,
    mileage: 12000,
    fuelType: "Diesel",
    transmission: "Automatic",
    color: "Black",
    vin: "123456789",

    category: "SUV",
    quantity: 10,
    };

    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.make).toBe(payload.make);

    expect(response.body.data.model).toBe(payload.model);

    expect(response.body.data.status).toBe("available");
    expect(response.body.data.category).toBe("SUV");
expect(response.body.data.quantity).toBe(10);
  });
});