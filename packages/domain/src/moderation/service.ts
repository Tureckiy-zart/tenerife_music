/**
 * Moderation Domain - Service (stub)
 */

import type { ModerationRepository } from './repository';

export interface ModerationServiceDependencies {
  moderationRepository: ModerationRepository;
}

export class ModerationService {
  constructor(private deps: ModerationServiceDependencies) {}

  async logModeration(data: {
    targetType: string;
    targetId: string;
    moderatorId?: string;
    fromStatus?: string;
    toStatus: string;
    reason?: string;
  }) {
    return this.deps.moderationRepository.createLog(data);
  }

  // TODO: Implement moderation queue management, policy enforcement
}
