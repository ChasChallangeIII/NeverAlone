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
