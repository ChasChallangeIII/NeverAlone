import express from 'express';
import { signin, signup, removeAccount } from '../controllers/authController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/login', signin);
router.post('/register', signup);
router.delete('/delete/:deletecommand', verifyToken, removeAccount);

export default router;
