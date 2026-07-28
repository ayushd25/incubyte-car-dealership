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

export const getVehicles = async () => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });

  return {
    success: true,
    data: vehicles,
  };
};