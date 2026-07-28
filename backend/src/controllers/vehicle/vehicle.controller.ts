import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,
} from "../../services/vehicle/vehicle.service";
import { catchAsync } from "../../utils/catchAsync";

export const create = catchAsync(async (req: Request, res: Response) => {
  const result = await createVehicle(
    req.body,
    req.user!.id
  );

  return res.status(201).json(result);
});

export const getAll = catchAsync(async (_req, res) => {
  const result = await getVehicles();

  return res.status(200).json(result);
});

export const getById = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await getVehicleById(id);

  return res.status(200).json(result);
});