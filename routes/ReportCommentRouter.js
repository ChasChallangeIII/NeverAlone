import express from "express";
import {
  getComments,
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} from "../controllers/reportCommentController.js";

const router = express.Router();

// GET /admin/comments/report/:reportId → Hämta kommentarer för specifik rapport
router.get("/report/:reportId", getComments);

// GET /admin/comments → Hämta alla kommentarer
router.get("/", getAllComments);

// POST /admin/comments
router.post("/", createComment);

// PUT /admin/comments/:id
router.put("/:id", updateComment);

// DELETE /admin/comments/:id
router.delete("/:id", deleteComment);

export default router;
