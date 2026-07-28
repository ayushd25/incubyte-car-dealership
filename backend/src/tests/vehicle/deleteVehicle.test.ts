import request from "supertest";
import app from "../../app";

describe("DELETE /api/vehicles/:id", () => {
  it("should delete a vehicle successfully", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "delete@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    const createResponse = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        year: 2022,
        price: 35000,
        mileage: 15000,
        fuelType: "Diesel",
        transmission: "Automatic",
        color: "Black",
        vin: "DELETEVIN123456789",
        category: "SUV",
quantity: 10,
      });

    const vehicleId = createResponse.body.data._id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(
      "Vehicle deleted successfully"
    );
  });
});