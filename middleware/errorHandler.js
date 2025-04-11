const logger = require("../utils/logger");
const { AppError } = require("../utils/errors");

function errorHandler(err, req, res, next) {
  // Logga alltid felet
  logger.error(err.stack || err.message || err);

  // Om det är ett "känt" fel, använd dess statuskod och meddelande
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.constructor.name,
      message: err.message,
    });
  }

  // Hantera övriga (okända) fel som 500
  res.status(500).json({
    error: "Serverfel",
    message: "Ett oväntat fel uppstod.",
  });
}

module.exports = errorHandler;
