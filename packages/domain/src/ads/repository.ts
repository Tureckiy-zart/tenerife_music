/**
 * Ads Domain - Repository Interface
 */

import type { AdPlacement, AdSlot, AdStatus } from '@prisma/client';

export interface AdFilters {
  slot?: AdSlot;
  status?: AdStatus;
  orgId?: string;
  activeAt?: Date;
}

export interface AdRepository {
  findById(id: string): Promise<AdPlacement | null>;
  findActiveAds(slot: AdSlot, at: Date): Promise<AdPlacement[]>;
  create(data: any): Promise<AdPlacement>;
  update(id: string, data: any): Promise<AdPlacement>;
  incrementImpressions(id: string): Promise<void>;
  incrementClicks(id: string): Promise<void>;
}
