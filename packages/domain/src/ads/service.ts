/**
 * Ads Domain - Service (stub)
 */

import type { AdRepository } from './repository';
import type { AdSlot } from '@prisma/client';

export interface AdsServiceDependencies {
  adRepository: AdRepository;
}

export class AdsService {
  constructor(private deps: AdsServiceDependencies) {}

  async getActiveAdsForSlot(slot: AdSlot) {
    return this.deps.adRepository.findActiveAds(slot, new Date());
  }

  async trackImpression(adId: string) {
    await this.deps.adRepository.incrementImpressions(adId);
  }

  async trackClick(adId: string) {
    await this.deps.adRepository.incrementClicks(adId);
  }

  // TODO: Implement ad campaign management, budget tracking, targeting
}
