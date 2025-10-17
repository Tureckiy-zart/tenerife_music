/**
 * Domain Error Classes
 * Base error types for consistent error handling across the application
 */

export enum ErrorCode {
  // Generic
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // Business Logic
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  RESOURCE_LOCKED = 'RESOURCE_LOCKED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  
  // External Services
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  STORAGE_ERROR = 'STORAGE_ERROR',
  SEARCH_ERROR = 'SEARCH_ERROR',
}

export interface ErrorDetails {
  field?: string;
  constraint?: string;
  value?: any;
  [key: string]: any;
}

/**
 * Base Domain Error
 */
export class DomainError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: ErrorDetails;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    statusCode = 500,
    details?: ErrorDetails
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date();
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

/**
 * Validation Error - for input validation failures
 */
export class ValidationError extends DomainError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, details);
  }
}

/**
 * Not Found Error - resource doesn't exist
 */
export class NotFoundError extends DomainError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, ErrorCode.NOT_FOUND, 404, { resource, identifier });
  }
}

/**
 * Unauthorized Error - authentication required
 */
export class UnauthorizedError extends DomainError {
  constructor(message = 'Authentication required') {
    super(message, ErrorCode.UNAUTHORIZED, 401);
  }
}

/**
 * Forbidden Error - insufficient permissions
 */
export class ForbiddenError extends DomainError {
  constructor(message = 'Insufficient permissions', details?: ErrorDetails) {
    super(message, ErrorCode.FORBIDDEN, 403, details);
  }
}

/**
 * Business Rule Violation - domain logic constraint violated
 */
export class BusinessRuleViolationError extends DomainError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, ErrorCode.BUSINESS_RULE_VIOLATION, 422, details);
  }
}

/**
 * Duplicate Resource Error - unique constraint violation
 */
export class DuplicateResourceError extends DomainError {
  constructor(resource: string, field: string, value: any) {
    super(
      `${resource} with ${field} '${value}' already exists`,
      ErrorCode.DUPLICATE_RESOURCE,
      409,
      { resource, field, value }
    );
  }
}

/**
 * Quota Exceeded Error - plan limits reached
 */
export class QuotaExceededError extends DomainError {
  constructor(quota: string, limit: number, current: number) {
    super(
      `Quota exceeded for '${quota}'. Limit: ${limit}, Current: ${current}`,
      ErrorCode.QUOTA_EXCEEDED,
      429,
      { quota, limit, current }
    );
  }
}

/**
 * Invalid State Transition Error - illegal state change
 */
export class InvalidStateTransitionError extends DomainError {
  constructor(from: string, to: string, reason?: string) {
    const message = reason
      ? `Cannot transition from '${from}' to '${to}': ${reason}`
      : `Cannot transition from '${from}' to '${to}'`;
    super(message, ErrorCode.INVALID_STATE_TRANSITION, 422, { from, to });
  }
}

/**
 * External Service Error - third-party service failure
 */
export class ExternalServiceError extends DomainError {
  constructor(service: string, message: string, details?: ErrorDetails) {
    super(
      `${service} error: ${message}`,
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      502,
      { service, ...details }
    );
  }
}

/**
 * Type guard to check if error is a DomainError
 */
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}

/**
 * Helper to convert unknown errors to DomainError
 */
export function toDomainError(error: unknown): DomainError {
  if (isDomainError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new DomainError(error.message, ErrorCode.INTERNAL_ERROR, 500);
  }

  return new DomainError(
    'An unexpected error occurred',
    ErrorCode.INTERNAL_ERROR,
    500
  );
}
