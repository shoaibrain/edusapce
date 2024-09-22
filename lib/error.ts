export type ErrorType =
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'VALIDATION_ERROR'
  | 'DATABASE_ERROR'
  | 'UNKNOWN_ERROR';

interface ErrorDetails {
  [key: string]: unknown;
}

export class AppError extends Error {
  readonly type: ErrorType;
  readonly isOperational: boolean;
  readonly details: ErrorDetails;

  constructor(type: ErrorType, message: string, isOperational = true, details: ErrorDetails = {}) {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string, details: ErrorDetails = {}) {
    super('AUTHENTICATION_ERROR', message, true, details);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string, details: ErrorDetails = {}) {
    super('AUTHORIZATION_ERROR', message, true, details);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: ErrorDetails = {}) {
    super('VALIDATION_ERROR', message, true, details);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details: ErrorDetails = {}) {
    super('DATABASE_ERROR', message, true, details);
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
