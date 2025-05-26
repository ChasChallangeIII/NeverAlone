import { AppError } from "../utils/errors/errors.js";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message || err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid request data",
      issues: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false,
    });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      message: "Your session has expired, plase login in again to continue",
      success: false,
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message: "An unknown error occurred",
  });
};

export default errorHandler;
