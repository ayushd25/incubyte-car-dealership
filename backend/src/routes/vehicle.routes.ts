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
import { authorize } from "../middlewares/authorize.middleware";


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
  authorize("admin"),
  restock
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  remove
);

export default router;