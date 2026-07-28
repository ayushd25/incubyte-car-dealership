import { Router } from "express";
import {
  create,
  getAll,
  getById,update,remove,
} from "../controllers/vehicle/vehicle.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validators/vehicle.validator";
import router from "./auth.routes";

router.post(
  "/",
  authenticate,
  validate(createVehicleSchema),
  create
);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.patch(
  "/:id",
  authenticate,
  validate(updateVehicleSchema),
  update
);

router.delete("/:id", authenticate, remove);

export default router;