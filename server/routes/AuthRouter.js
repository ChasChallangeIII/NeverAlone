import express from "express";
import {
  removeAccount,
  signin,
  signup,
} from "../controllers/AuthController.js";
import { authenticate } from "../middleware/auth.js";
import {
  validateSigninReqBody,
  validateSignupReqBody,
} from "../validators/authValidator.js";

const router = express.Router();

router.post("/signup", validateSignupReqBody, signup);

router.post("/signin", validateSigninReqBody, signin);

router.delete("/account/:deletecommand", authenticate, removeAccount);

export default router;
