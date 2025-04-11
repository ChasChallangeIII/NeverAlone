class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // För att särskilja "kända" fel
  }
}

class BadRequestError extends AppError {
  constructor(message = "Ogiltig begäran") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Ej autentiserad") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Otillåtet") {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resursen kunde inte hittas") {
    super(message, 404);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
