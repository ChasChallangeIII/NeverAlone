import express from 'express';
import { getReports } from '../controllers/reportsController.js';
import { verifyToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, authorizeAdmin, getReports);

export default router;