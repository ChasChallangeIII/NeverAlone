import express from "express";
import {
  removeAccount,
  signin,
  signout,
  signup,
} from "../controllers/AuthController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/signout", signout);

router.delete("/account", authenticate, removeAccount);

export default router;
