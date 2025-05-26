import express from 'express';
import { getComments, postComment } from '../controllers/commentsController.js';

const router = express.Router();
router.get('/', getComments);
router.post('/', postComment);

export default router;
