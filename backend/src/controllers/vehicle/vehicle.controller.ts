import { Request, Response } from "express";
import { createVehicle } from "../../services/vehicle/vehicle.service";
import { catchAsync } from "../../utils/catchAsync";

export const create = catchAsync(async (req: Request, res: Response) => {
  const result = await createVehicle(
    req.body,
    req.user!.id
  );

  return res.status(201).json(result);
});