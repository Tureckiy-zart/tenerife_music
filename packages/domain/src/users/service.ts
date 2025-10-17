/**
 * Users Domain - Service (stub)
 */

import type { UserRepository } from './repository';
import { NotFoundError } from '@tenerife.music/shared';

export interface UsersServiceDependencies {
  userRepository: UserRepository;
}

export class UsersService {
  constructor(private deps: UsersServiceDependencies) {}

  async getUserById(id: string) {
    const user = await this.deps.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  }

  // TODO: Implement registration, authentication, profile management
}
