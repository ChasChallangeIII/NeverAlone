import { AppError } from "./errors.js";

export class GroupCreationError extends AppError {
  constructor(message = "Error creating group") {
    super(message, 400);
  }
}
