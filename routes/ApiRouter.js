import express from "express";
import { addReport } from "../controllers/ReportController.js";
import { validateReportReqBody } from "../validators/reportValidator.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

export default router;
