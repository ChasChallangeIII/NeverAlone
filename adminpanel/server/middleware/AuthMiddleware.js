import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NoTokenError, UnauthorizedError } from '../utils/authErrors.js';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Token saknas." });

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token är ogiltig eller har gått ut." });
        }

        req.user = decoded; // Sätt decoded token som req.user
        next();
    });
};

export const authorizeAdmin = (req, res, next) => {
    console.log('Admin-check, decoded JWT payload:', req.user);

    if (req.user.isAdmin !== true) {
        return res.status(403).json({ message: 'Inte administratör, access denied', success: false });
    }

    next();
};