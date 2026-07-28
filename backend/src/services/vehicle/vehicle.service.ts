import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Vehicle } from "../../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../../dto/vehicle/vehicle.dto";

export const createVehicle = async (
  data: CreateVehicleDto,
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

export const getVehicles = async (
  filters: { make?: string }
) => {
  const query: Record<string, unknown> = {};

  if (filters.make) {
    query.make = filters.make;
  }

  const vehicles = await Vehicle.find(query);

  return {
    success: true,
    data: vehicles,
  };
};
export const getVehicleById = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid vehicle id", 400);
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return {
    success: true,
    data: vehicle,
  };
};

export const updateVehicle = async (
  id: string,
  data: UpdateVehicleDto
) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid vehicle id", 400);
  }

 const vehicle = await Vehicle.findByIdAndUpdate(
  id,
  data,
  {
    returnDocument: "after",
    runValidators: true,
  }
);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return {
    success: true,
    message: "Vehicle updated successfully",
    data: vehicle,
  };
};

export const deleteVehicle = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid vehicle id", 400);
  }

  const vehicle = await Vehicle.findByIdAndDelete(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  return {
    success: true,
    message: "Vehicle deleted successfully",
  };
};

