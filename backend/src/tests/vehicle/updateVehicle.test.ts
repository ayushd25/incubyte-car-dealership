import request from "supertest";
import app from "../../app";

describe("PATCH /api/vehicles/:id", () => {
  it("should update a vehicle successfully", async () => {
    // Register user
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "update@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    // Create vehicle
    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        price: 20000,
        mileage: 12000,
        fuelType: "Petrol",
        transmission: "Automatic",
        color: "White",
        vin: "UPDATEVIN123456789",
        category: "SUV",
quantity: 10,
      });

    const vehicleId = createResponse.body.data._id;

    // Update vehicle
    const response = await request(app)
      .patch(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 18000,
        color: "Black",
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Vehicle updated successfully"
    );

    expect(response.body.data.price).toBe(18000);

    expect(response.body.data.color).toBe("Black");
  });
});