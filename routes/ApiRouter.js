import express from "express";
import { NotFoundError } from "../utils/errors/appErrors.js";
const router = express.Router();

router.post("/records", (req, res, next) => {
  try {
    const data = null;
    if (!data) {
      throw new NotFoundError("Inget innehåll hittades");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
