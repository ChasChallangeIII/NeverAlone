import express from "express";
import { addReport } from "../controllers/ReportController.js";
import { validateReportReqBody } from "../validators/reportValidator.js";
import ContactRoutes from "./ContactRoutes.js";
import CommunityRoutes from "./CommunityRoutes.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

router.use("/contacts", ContactRoutes);

router.use("/community", CommunityRoutes);

export default router;
