import request from "supertest";
import app from "../../app";

describe("GET /api/vehicles pagination", () => {
  it("should return paginated vehicles", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Ayush",
        email: "pagination@test.com",
        password: "password123",
      });

    const token = registerResponse.body.data.token;

    for (let i = 1; i <= 5; i++) {
      await request(app)
        .post("/api/vehicles")
        .set("Authorization", `Bearer ${token}`)
        .send({
          make: "Toyota",
          model: `Model-${i}`,
          year: 2023,
          price: 20000 + i,
          mileage: 10000,
          fuelType: "Petrol",
          transmission: "Manual",
          color: "White",
          vin: `PAGINATIONVIN00000000${i}`,
          category: "SUV",
quantity: 10,
        });
    }

    const response = await request(app)
      .get("/api/vehicles?page=2&limit=2")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveLength(2);
  });
});