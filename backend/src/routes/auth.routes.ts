import { Router } from "express";
import { register } from "../controllers/auth/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validators/auth.validator";
import { loginSchema } from "../validators/login.validator";
import { login } from "../controllers/auth/auth.controller";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post(
  "/login",
  validate(loginSchema),
  login
);
export default router;