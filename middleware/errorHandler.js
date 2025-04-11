import { AppError } from "../utils/errors/errors.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message || err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.constructor.name,
      message: err.message,
    });
  }

  res.status(500).json({
    error: "Internal server error",
    message: "An unknown error occurred",
  });
};

export default errorHandler;
