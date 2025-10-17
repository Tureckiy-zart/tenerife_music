/**
 * Radio Domain - Service (stub)
 */

import type { RadioRepository } from './repository';
import { NotFoundError } from '@tenerife.music/shared';

export interface RadioServiceDependencies {
  radioRepository: RadioRepository;
}

export class RadioService {
  constructor(private deps: RadioServiceDependencies) {}

  async getStationBySlug(slug: string) {
    const station = await this.deps.radioRepository.findStationBySlug(slug);
    if (!station) {
      throw new NotFoundError('RadioStation', slug);
    }
    return station;
  }

  // TODO: Implement now playing updates, track logging, show scheduling
}
