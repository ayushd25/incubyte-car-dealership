import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

describe("GET /api/vehicles/:id", () => {
  it("should return a vehicle by id", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "vehicleid@test.com",
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
        price: 4200000,
        mileage: 12000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "VIN-GET-001",
        category: "SUV",
quantity: 10,
      });

    const vehicleId = createResponse.body.data._id;

    const response = await request(app)
      .get(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data._id).toBe(vehicleId);

    expect(response.body.data.make).toBe("Toyota");
  });
  it("should return 400 for an invalid vehicle id", async () => {
  const registerResponse = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "invalidid@test.com",
      password: "password123",
    });

  const token = registerResponse.body.data.token;

  const response = await request(app)
    .get("/api/vehicles/invalid-id")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(400);

  expect(response.body.success).toBe(false);
});
it("should return 404 when vehicle does not exist", async () => {
  const registerResponse = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "notfound@test.com",
      password: "password123",
      
    });

  const token = registerResponse.body.data.token;

  const validId = new mongoose.Types.ObjectId().toString();

  const response = await request(app)
    .get(`/api/vehicles/${validId}`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(404);

  expect(response.body.success).toBe(false);

  expect(response.body.message).toBe("Vehicle not found");
});
});