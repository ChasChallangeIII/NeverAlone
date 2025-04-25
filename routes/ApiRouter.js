import express from "express";
import { addReport, getReport, getReports } from "../controllers/ReportsController.js";
import { validateReportReqBody } from "../validators/reportSchema.js";
const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

router.get("/reports", getReports);

router.get("/reports/:reportid", getReport);

export default router;
