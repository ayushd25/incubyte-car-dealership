import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles?make=Toyota", () => {
  it("should return only Toyota vehicles", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "search@test.com",
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
        vin: "SEARCHVIN111111111",
        category: "SUV",
quantity: 10,
      });

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "City",
        year: 2023,
        price: 22000,
        mileage: 9000,
        fuelType: "Petrol",
        transmission: "Manual",
        color: "White",
        vin: "SEARCHVIN222222222",
        category: "SUV",
quantity: 10,
      });

    const response = await request(app)
      .get("/api/vehicles?make=Toyota")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].make).toBe("Toyota");
  });
});