import { AppError } from "./errors.js";

export class GroupCreationError extends AppError {
  constructor(message = "Error creating group") {
    super(message, 400);
  }
}

export class UserAlreadyInGroupError extends AppError {
  constructor(message = "You is already a member of the group") {
    super(message, 400);
  }
}

export class UserIsNotGroupMemberError extends AppError {
  constructor(message = "You are not a member of this group") {
    super(message, 400);
  }
}
