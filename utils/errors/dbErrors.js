import { AppError } from "./errors.js";

export class GroupCreationError extends AppError {
  constructor(message = "Error creating group") {
    super(message, 400);
  }
}

export class UserAlreadyInGroupError extends AppError {
  constructor(message = "User is already a member of the group") {
    super(message, 400);
  }
}
