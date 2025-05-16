import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import commentsRoutes from './routes/commentsRoute.js';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import reportsRoutes from './routes/reportsRoute.js';
import { verifyToken, authorizeAdmin } from './middleware/AuthMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://neveralone.onrender.com',]
}));

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Servern är igång!' });
});

app.use("/api/auth", authRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', usersRoutes);


app.use('/api/reports', verifyToken, authorizeAdmin, (req, res, next) => {
    console.log('Authorization successful, proceeding to reports route');
    next();
}, reportsRoutes);


app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});
