import { Vehicle } from "../../models/vehicle.model";

export const createVehicle = async (
  data: any,
  userId: string
) => {
  const vehicle = await Vehicle.create({
    ...data,
    createdBy: userId,
  });

  return {
    success: true,
    message: "Vehicle created successfully",
    data: vehicle,
  };
};