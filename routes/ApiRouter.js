import express from "express";
import {
  addReport,
  getReport,
  getReports,
} from "../controllers/ReportsController.js";
const router = express.Router();

router.post("/reports", addReport);

router.get("/reports", getReports);

router.get("/reports/:reportid", getReport);

export default router;
