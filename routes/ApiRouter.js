import express from "express";
import { addReport } from "../controllers/ReportController.js";
import { validateReportReqBody } from "../validators/reportValidator.js";
import ContactRoutes from "./ContactRoutes.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);
router.use("/contacts", ContactRoutes);

export default router;
