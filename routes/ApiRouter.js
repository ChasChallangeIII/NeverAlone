import express from "express";
import { addReport } from "../controllers/ReportController.js";
import { validateReportReqBody } from "../validators/reportValidator.js";
import GroupRouter from "./GroupRouter.js";
import ContactRouter from "./ContactRoutes.js";
import CommunityRoutes from "./CommunityRoutes.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

router.use("/contacts", ContactRouter);

router.use("/groups", GroupRouter);

router.use("/community", CommunityRoutes);

export default router;
