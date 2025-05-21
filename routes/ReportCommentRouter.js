import express from "express";
import { getComments, createComment, updateComment, deleteComment } from "../controllers/reportCommentController.js";

const router = express.Router();


router.get("/", getComments);

router.post("/", createComment);


router.put("/:id", updateComment);


router.delete("/:id", deleteComment);

export default router;
