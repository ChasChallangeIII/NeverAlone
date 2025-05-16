import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getCommentsForPost,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/CommunityController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Posts
router.get("/posts", getPosts);
router.post("/posts", authenticate, createPost);
router.put("/posts/:postId", authenticate, updatePost);
router.delete("/posts/:postId", authenticate, deletePost);

// Comments
router.get("/posts/:postId/comments", getCommentsForPost);
router.post("/posts/:postId/comments", authenticate, addComment);
router.put("/comments/:commentId", authenticate, updateComment);
router.delete("/comments/:commentId", authenticate, deleteComment);

export default router;
