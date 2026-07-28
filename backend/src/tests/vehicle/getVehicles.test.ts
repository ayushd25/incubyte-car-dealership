import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles", () => {
  it("should return all vehicles", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "list@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        year: 2023,
        price: 4200000,
        mileage: 15000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "VIN111111",
      });

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].make).toBe("Toyota");
  });
});