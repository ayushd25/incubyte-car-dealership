import { z } from "zod";

export const createVehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int(),
  price: z.number().positive(),
  mileage: z.number().min(0),
  fuelType: z.string().min(1),
  transmission: z.string().min(1),
  color: z.string().min(1),
  vin: z.string().min(1),
  category: z.enum([
  "SUV",
  "Sedan",
  "Hatchback",
  "Truck",
  "Coupe",
  "Convertible",
]),

quantity: z.number().int().min(0),
});
export const updateVehicleSchema =
  createVehicleSchema.partial();