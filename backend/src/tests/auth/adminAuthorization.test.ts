import request from "supertest";
import app from "../../app";
import { User } from "../../models/user.model";

describe("Admin Authorization", () => {
  it("should prevent normal user from deleting a vehicle", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "User",
        email: "user@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        year: 2023,
        price: 35000,
        mileage: 12000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "ADMINTEST001",
        category: "SUV",
        quantity: 2,
      });

    const vehicleId = createResponse.body.data._id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

  it("should allow admin to delete a vehicle", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "password123",
      });

    await User.findOneAndUpdate(
      { email: "admin@test.com" },
      { role: "admin" }
    );

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123",
      });

    const token = loginResponse.body.data.token;

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "BMW",
        model: "X5",
        year: 2024,
        price: 70000,
        mileage: 1000,
        fuelType: "Petrol",
        transmission: "Automatic",
        color: "White",
        vin: "ADMINTEST002",
        category: "SUV",
        quantity: 3,
      });

    const vehicleId = createResponse.body.data._id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});