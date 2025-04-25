import express from "express";
import { addReport } from "../controllers/ReportsController.js";
import { validateReportReqBody } from "../validators/reportSchema.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

export default router;
