import { Request, Response } from "express";
import {
  createVehicle,
  getVehicles,
  getVehicleById,updateVehicle,deleteVehicle,
} from "../../services/vehicle/vehicle.service";
import { catchAsync } from "../../utils/catchAsync";

export const create = catchAsync(async (req: Request, res: Response) => {
  const result = await createVehicle(
    req.body,
    req.user!.id
  );

  return res.status(201).json(result);
});

export const getAll = catchAsync(async (req, res) => {
  const result = await getVehicles({
    make: req.query.make as string,
    model: req.query.model as string,
    fuelType: req.query.fuelType as string,
    transmission: req.query.transmission as string,
    status: req.query.status as string,

    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
  });

  return res.status(200).json(result);
});


export const getById = catchAsync(async (req, res) => {
  const id = req.params.id as string;

  const result = await getVehicleById(id);

  return res.status(200).json(result);
});

export const update = catchAsync(async (req, res) => {
  const result = await updateVehicle(
    req.params.id as string,
    req.body
  );

  return res.status(200).json(result);
});

export const remove = catchAsync(async (req, res) => {
  const result = await deleteVehicle(req.params.id as string);

  return res.status(200).json(result);
});