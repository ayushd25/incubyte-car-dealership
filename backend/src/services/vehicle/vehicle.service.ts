import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Vehicle } from "../../models/vehicle.model";
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../../dto/vehicle/vehicle.dto";
import { VehicleSearchDto } from "../../dto/vehicle/vehicleSearch.dto";

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
  filters: VehicleSearchDto
) => {
  const query: Record<string, unknown> = {};

  if (filters.make) {
    query.make = filters.make;
  }

  if (filters.model) {
    query.model = filters.model;
  }

  if (filters.fuelType) {
    query.fuelType = filters.fuelType;
  }

  if (filters.transmission) {
    query.transmission = filters.transmission;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const skip = (page - 1) * limit;

  const vehicles = await Vehicle.find(query)
    .skip(skip)
    .limit(limit);

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

export const purchaseVehicle = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid vehicle id", 400);
  }

  const vehicle = await Vehicle.findById(id);

  if (!vehicle) {
    throw new AppError("Vehicle not found", 404);
  }

  if (vehicle.quantity <= 0) {
    throw new AppError("Vehicle is out of stock", 400);
  }

  vehicle.quantity -= 1;

  if (vehicle.quantity === 0) {
    vehicle.status = "sold";
  }

  await vehicle.save();

  return {
    success: true,
    message: "Vehicle purchased successfully",
    data: vehicle,
  };
};