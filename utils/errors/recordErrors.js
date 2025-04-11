export class RecordNotFoundError extends AppError {
  constructor(message = "Record not found") {
    super(message, 404);
  }
}
