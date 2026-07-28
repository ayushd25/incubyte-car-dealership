import { Router } from "express";
import {
  create,
  getAll,
} from "../controllers/vehicle/vehicle.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createVehicleSchema } from "../validators/vehicle.validator";

const router = Router();
router.get(
  "/",
  authenticate,
  getAll
);

router.post(
  "/",
  authenticate,
  validate(createVehicleSchema),
  create
);

export default router;