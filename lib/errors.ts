export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error') {
    super(400, message);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database Error') {
    super(500, message);
  }
}
