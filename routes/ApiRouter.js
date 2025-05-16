import express from "express";
import { addReport } from "../controllers/ReportController.js";
import { validateReportReqBody } from "../validators/reportValidator.js";
import ContactRouter from "./ContactRouter.js";
import GroupRouter from "./GroupRouter.js";

const router = express.Router();

router.post("/reports", validateReportReqBody, addReport);

router.use("/contacts", ContactRouter);

router.use("/groups", GroupRouter);

export default router;
