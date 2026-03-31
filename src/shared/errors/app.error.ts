export enum ErrorCode {
  UNEXPECTED = 'UNEXPECTED',
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  TRANSACTION_ALREADY_EXISTS = 'TRANSACTION_ALREADY_EXISTS',
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
}

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const Errors = {
  InternalServerError: (message = 'Internal server error') =>
    new AppError(ErrorCode.UNEXPECTED, message),
  BadRequest: (message = 'Bad request') =>
    new AppError(ErrorCode.VALIDATION_FAILED, message),
  NotFound: (message = 'Not found') =>
    new AppError(ErrorCode.ENTITY_NOT_FOUND, message),
  BusinessRuleViolation: (message: string) =>
    new AppError(ErrorCode.BUSINESS_RULE_VIOLATION, message),
};
