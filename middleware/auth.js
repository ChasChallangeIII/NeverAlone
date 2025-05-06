import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  InvalidRefreshTokenError,
  NotAdminError,
  NoTokenError,
  UnauthorizedError,
} from "../utils/errors/authErrors";
import { ensureAdmin } from "../services/authService";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const isProd = process.env.NODE_ENV;

export const authenticate = (req, res, next) => {
  // const accessToken = req.cookies.access_token;
  // const refreshToken = req.cookies.refresh_token;

  // if (!accessToken) {
  //   return handleRefreshToken(req, res, next, refreshToken);
  // }

  // try {
  //   const user = jwt.verify(accessToken, JWT_SECRET);
  //   req.user = user;
  //   next();
  // } catch (err) {
  //   if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
  //     return handleRefreshToken(req, res, next, refreshToken);
  //   }
  //   next(new UnauthorizedError());
  // }
  next();
};

export const handleRefreshToken = (req, res, next, refreshToken) => {
  if (!refreshToken) return next(new NoTokenError());

  try {
    const user = jwt.verify(refreshToken, JWT_SECRET);

    const newAccessToken = jwt.sign({ ...user }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign({ ...user }, JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    req.user = user;
    return next();
  } catch (err) {
    next(new InvalidRefreshTokenError());
  }
};

export const authorizeAdmin = async (req, res, next) => {
  // const accessToken = req.cookies.access_token;

  // if (!accessToken) {
  //   return next(new NoTokenError());
  // }

  // try {
  //   const user = jwt.verify(accessToken, JWT_SECRET);

  //   if (!user || !user.admin) {
  //     return next(new NotAdminError());
  //   }

  //   const isAdmin = await ensureAdmin(user.id);

  //   if (!isAdmin) {
  //     return next(new NotAdminError());
  //   }

  //   next();
  // } catch (err) {
  //   next(err);
  // }

  next();
};
