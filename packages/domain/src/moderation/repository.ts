/**
 * Moderation Domain - Repository Interface
 */

import type { ModerationLog } from '@prisma/client';

export interface ModerationFilters {
  targetType?: string;
  targetId?: string;
  moderatorId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ModerationRepository {
  createLog(data: {
    targetType: string;
    targetId: string;
    moderatorId?: string;
    fromStatus?: string;
    toStatus: string;
    reason?: string;
  }): Promise<ModerationLog>;

  findLogs(filters: ModerationFilters): Promise<ModerationLog[]>;
  
  findPendingItems(targetType: string): Promise<any[]>;
}
