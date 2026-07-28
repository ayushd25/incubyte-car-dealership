import { Router } from "express";
import { register } from "../controllers/auth/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../validators/auth.validator";
import { loginSchema } from "../validators/login.validator";
import { login } from "../controllers/auth/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

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
router.get(
  "/me",
  authenticate,
  (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }
);
export default router;