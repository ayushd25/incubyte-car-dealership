import request from "supertest";
import app from "../../app";

describe("POST /api/vehicles/:id/restock", () => {
  it("should restock a sold vehicle", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "restock@test.com",
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
        vin: "RESTOCKVIN123456789",
        category: "SUV",
        quantity: 1,
      });

    const vehicleId = createResponse.body.data._id;

    await request(app)
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post(`/api/vehicles/${vehicleId}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 5,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.quantity).toBe(5);
    expect(response.body.data.status).toBe("available");
  });
  it("should return 400 when restock quantity is zero", async () => {
  const registerResponse = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Ayush",
      email: "restock-invalid@test.com",
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
      vin: "RESTOCKINVALID001",
      category: "SUV",
      quantity: 1,
    });

  const vehicleId = createResponse.body.data._id;

  const response = await request(app)
    .post(`/api/vehicles/${vehicleId}/restock`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 0,
    });

  expect(response.status).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe(
    "Restock quantity must be greater than zero"
  );
});
});