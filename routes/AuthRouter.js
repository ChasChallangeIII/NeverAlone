import express from "express";
import {
  removeAccount,
  signin,
  signout,
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

router.post("/signout", signout);

router.delete("/account/:deletecommand", authenticate, removeAccount);

export default router;
