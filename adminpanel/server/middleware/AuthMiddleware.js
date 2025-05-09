    import jwt from 'jsonwebtoken';
    import dotenv from 'dotenv';
    import { NoTokenError, UnauthorizedError } from '../utils/authErrors.js';

    dotenv.config();

    export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new NoTokenError();

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        throw new UnauthorizedError("Token är ogiltig eller har gått ut");
        }

        req.user = decoded;
        next();
    });
    };
