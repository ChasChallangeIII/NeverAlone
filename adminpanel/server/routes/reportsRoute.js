import express from 'express';
import { getReports } from '../controllers/reportsController.js';
import { verifyToken, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('/api/reports GET route hit');
    getReports(req, res);
});

export default router;