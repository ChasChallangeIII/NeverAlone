import express from "express";
import { getReport, getReports } from "../controllers/ReportController.js";

const router = express.Router();

router.get("/reports", getReports);

router.get("/reports/:reportid", getReport);


export default router;
