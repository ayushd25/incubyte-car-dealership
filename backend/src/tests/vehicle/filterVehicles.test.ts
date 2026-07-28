import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles with filters", () => {
  it("should filter vehicles by make and fuel type", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "filter@test.com",
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
        price: 40000,
        mileage: 10000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "FILTERVIN111111111",
         category: "SUV",
quantity: 10,
      });

    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Innova",
        year: 2023,
        price: 35000,
        mileage: 8000,
        fuelType: "Petrol",
        transmission: "Manual",
        color: "White",
        vin: "FILTERVIN222222222",
        category: "SUV",
quantity: 10,
      });

    const response = await request(app)
      .get("/api/vehicles?make=Toyota&fuelType=Diesel")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(1);

    expect(response.body.data[0].model).toBe("Fortuner");
  });
});