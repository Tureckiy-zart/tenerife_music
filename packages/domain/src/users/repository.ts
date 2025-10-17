/**
 * Users Domain - Repository Interface
 */

import type { User, UserRole } from '@prisma/client';

export interface UserWithProfile extends User {
  profile?: any;
  settings?: any;
}

export interface UserFilters {
  email?: string;
  role?: UserRole;
  isDeleted?: boolean;
}

export interface CreateUserData {
  email: string;
  name: string;
  password?: string;
  role: UserRole;
  profile?: any;
  settings?: any;
}

export interface UpdateUserData extends Partial<CreateUserData> {}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findMany(filters: UserFilters): Promise<User[]>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  softDelete(id: string): Promise<void>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
}
