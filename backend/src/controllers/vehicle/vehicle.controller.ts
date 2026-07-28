import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
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