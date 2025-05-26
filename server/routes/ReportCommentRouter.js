import express from "express";
import {
  getComments,
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} from "../controllers/reportCommentController.js";

const router = express.Router();

// GET alla kommentarer
router.get("/", getAllComments);

// GET kommentarer för specifik rapport
router.get("/report/:reportId", getComments);

// POST ny kommentar till specifik rapport
router.post("/report/:reportId", createComment);

// PUT uppdatera kommentar
router.put("/:commentId", updateComment);

// DELETE kommentar
router.delete("/:commentId", deleteComment);

export default router;
