/**
 * Shared Types
 * Common types used across the application
 */

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Sort parameters
 */
export interface SortParams {
  field: string;
  order: SortOrder;
}

/**
 * Date range filter
 */
export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Success response wrapper
 */
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  meta?: Record<string, any>;
}

/**
 * Error response wrapper
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

/**
 * API Response
 */
export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * ID type - consistent identifier type
 */
export type ID = string;

/**
 * Timestamp fields (for entities)
 */
export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Soft delete fields
 */
export interface SoftDelete {
  isDeleted: boolean;
  deletedAt: Date | null;
}

/**
 * Versioning field
 */
export interface Versioned {
  version: number;
}

/**
 * Base entity interface
 */
export interface BaseEntity extends Timestamps {
  id: ID;
}

/**
 * Create paginated result helper
 */
export function createPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Create success response helper
 */
export function createSuccessResponse<T>(
  data: T,
  meta?: Record<string, any>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Create error response helper
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, any>
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
  };
}

/**
 * Omit soft delete fields from type
 */
export type WithoutSoftDelete<T> = Omit<T, keyof SoftDelete>;

/**
 * Make fields optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make fields required
 */
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract promise type
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
