import { Router } from "express";

const router = Router();
import {
  create,
  getAll,
  getById,
  update,
  remove,
  purchase, restock
} from "../controllers/vehicle/vehicle.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import {
  createVehicleSchema,
  updateVehicleSchema,
} from "../validators/vehicle.validator";


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
router.post(
  "/:id/purchase",
  authenticate,
  purchase
);
router.post(
  "/:id/restock",
  authenticate,
  restock
);

router.delete("/:id", authenticate, remove);

export default router;