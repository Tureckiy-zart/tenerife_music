/**
 * Organizations Domain - Service (stub)
 */

import type { OrganizationRepository } from './repository';
import { NotFoundError } from '@tenerife.music/shared';

export interface OrgsServiceDependencies {
  organizationRepository: OrganizationRepository;
}

export class OrgsService {
  constructor(private deps: OrgsServiceDependencies) {}

  async getOrgById(id: string) {
    const org = await this.deps.organizationRepository.findById(id);
    if (!org) {
      throw new NotFoundError('Organization', id);
    }
    return org;
  }

  // TODO: Implement org management, member management, billing sync
}
