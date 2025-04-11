import { AppError } from "./errors.js";

export class DuplicateUserError extends AppError {
  constructor(message = "Username already exsits") {
    super(message, 400);
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, 400);
  }
}

export class PasswordError extends AppError {
  constructor(message = "Incorrect password") {
    super(message, 400);
  }
}
