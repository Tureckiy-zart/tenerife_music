/**
 * Radio Domain - Repository Interface
 */

import type { RadioStation, RadioNowPlaying, RadioTrack } from '@prisma/client';

export interface RadioStationWithNowPlaying extends RadioStation {
  nowPlaying?: RadioNowPlaying | null;
}

export interface RadioRepository {
  findStationById(id: string): Promise<RadioStationWithNowPlaying | null>;
  findStationBySlug(slug: string): Promise<RadioStationWithNowPlaying | null>;
  listStations(): Promise<RadioStation[]>;
  
  updateNowPlaying(stationId: string, data: any): Promise<RadioNowPlaying>;
  createTrack(data: any): Promise<RadioTrack>;
  getRecentTracks(stationId: string, limit: number): Promise<RadioTrack[]>;
}
