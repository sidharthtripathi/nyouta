import { Router } from "express";
import {
  registerController,
  loginController,
  verifyEmailController,
  logoutController,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetpassword,
} from "../controllers/auth-controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify-email", verifyEmailController);
router.get("/logout", auth, logoutController);
router.put("/update-user-details", auth, updateUserDetails);
router.put("/forgot-password", forgotPasswordController);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
router.put("/reset-password", auth, resetpassword);

export default router;
