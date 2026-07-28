import request from "supertest";
import app from "../../app";

describe("POST /api/vehicles/:id/purchase", () => {
  it("should purchase a vehicle and reduce quantity", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "purchase@test.com",
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
        vin: "PURCHASEVIN123456789",
        category: "SUV",
        quantity: 5,
      });

    const vehicleId = createResponse.body.data._id;

    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.quantity).toBe(4);
    expect(response.body.data.status).toBe("available");
  });
});