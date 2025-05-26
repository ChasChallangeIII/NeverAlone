import { AppError } from "./errors.js";

export class ReportNotFoundError extends AppError {
  constructor(message = "Report not found") {
    super(message, 404);
  }
}
