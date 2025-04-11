const { NotFoundError } = require("../utils/errors");

function notFound(req, res, next) {
  // Skapa ett 404-fel för ej matchade routes
  next(new NotFoundError(`Kan inte hitta ${req.originalUrl}`));
}

module.exports = notFound;
