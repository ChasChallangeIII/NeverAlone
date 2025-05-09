import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NotAdminError, NoTokenError } from "../utils/errors/authErrors.js";
import { ensureAdmin } from "../services/authService.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(new NoTokenError());
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeAdmin = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(new NoTokenError());
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);

    if (!user || !user.admin) {
      return next(new NotAdminError());
    }

    const isAdmin = await ensureAdmin(user.id);

    if (!isAdmin) {
      return next(new NotAdminError());
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
