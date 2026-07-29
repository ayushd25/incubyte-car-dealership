import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles/search", () => {
  it("should search vehicles using the dedicated search endpoint", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "search-route@test.com",
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
        price: 35000,
        mileage: 12000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "SEARCHROUTE123456",
        category: "SUV",
        quantity: 5,
      });

    const response = await request(app)
      .get("/api/vehicles/search?make=Toyota")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
  });
});