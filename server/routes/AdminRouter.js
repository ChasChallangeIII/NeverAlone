import express from "express";
import { getReport, getReports } from "../controllers/ReportController.js";
import CommentsRouter from "./ReportCommentRouter.js";
import { getAllUsers } from "../controllers/userController.js"; 


const router = express.Router();

router.get("/users", getAllUsers);

router.get("/reports", getReports);

router.get("/reports/:reportid", getReport);

router.use("/comments", CommentsRouter);




export default router;
