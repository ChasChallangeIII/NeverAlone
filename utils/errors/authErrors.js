import { AppError } from "./errors.js";

export class DuplicateUserError extends AppError {
  constructor(message = "Username or email already exsits") {
    super(message, 400);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, 404);
  }
}

export class AdminNotFoundError extends AppError {
  constructor(message = "Admin not found") {
    super(message, 404);
  }
}

export class PasswordError extends AppError {
  constructor(message = "Incorrect password") {
    super(message, 400);
  }
}

export class DeleteUserError extends AppError {
  constructor(message = "Account could not be deleted") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class NoTokenError extends AppError {
  constructor(message = "No token, access denied") {
    super(message, 401);
  }
}

export class AccessError extends AppError {
  constructor(message = "Access denied") {
    super(message, 403);
  }
}

export class InvalidRefreshTokenError extends AppError {
  constructor(message = "Invalid refresh token") {
    super(message, 401);
  }
}

export class NotAdminError extends AppError {
  constructor(message = "Not Admin, access denied") {
    super(message, 403);
  }
}
