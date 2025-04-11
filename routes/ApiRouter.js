import express from "express";
import {
  addRecord,
  getRecord,
  getRecords,
} from "../controllers/RecordsController.js";
const router = express.Router();

router.post("/records", addRecord);

router.get("/records", getRecords);

router.get("/records/:recordid", getRecord);

export default router;
