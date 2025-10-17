/**
 * Geohash Utilities
 * Encoding/decoding and bounding box calculations for geographic search
 */

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface GeohashBounds {
  sw: Coordinates; // Southwest corner
  ne: Coordinates; // Northeast corner
}

/**
 * Encode latitude and longitude to geohash string
 * @param lat Latitude (-90 to 90)
 * @param lng Longitude (-180 to 180)
 * @param precision Number of characters in geohash (default: 7 for ~150m accuracy)
 * @returns Geohash string
 */
export function encodeGeohash(
  lat: number,
  lng: number,
  precision = 7
): string {
  if (lat < -90 || lat > 90) {
    throw new Error('Latitude must be between -90 and 90');
  }
  if (lng < -180 || lng > 180) {
    throw new Error('Longitude must be between -180 and 180');
  }

  let idx = 0;
  let bit = 0;
  let evenBit = true;
  let geohash = '';

  let latMin = -90,
    latMax = 90;
  let lngMin = -180,
    lngMax = 180;

  while (geohash.length < precision) {
    if (evenBit) {
      const lngMid = (lngMin + lngMax) / 2;
      if (lng > lngMid) {
        idx = (idx << 1) + 1;
        lngMin = lngMid;
      } else {
        idx = idx << 1;
        lngMax = lngMid;
      }
    } else {
      const latMid = (latMin + latMax) / 2;
      if (lat > latMid) {
        idx = (idx << 1) + 1;
        latMin = latMid;
      } else {
        idx = idx << 1;
        latMax = latMid;
      }
    }
    evenBit = !evenBit;

    if (++bit === 5) {
      geohash += BASE32[idx];
      bit = 0;
      idx = 0;
    }
  }

  return geohash;
}

/**
 * Decode geohash string to approximate coordinates
 * @param geohash Geohash string
 * @returns Coordinates with lat/lng
 */
export function decodeGeohash(geohash: string): Coordinates {
  let evenBit = true;
  let latMin = -90,
    latMax = 90;
  let lngMin = -180,
    lngMax = 180;

  for (let i = 0; i < geohash.length; i++) {
    const char = geohash[i];
    const idx = BASE32.indexOf(char);

    if (idx === -1) {
      throw new Error(`Invalid geohash character: ${char}`);
    }

    for (let bit = 4; bit >= 0; bit--) {
      const bitValue = (idx >> bit) & 1;

      if (evenBit) {
        const lngMid = (lngMin + lngMax) / 2;
        if (bitValue === 1) {
          lngMin = lngMid;
        } else {
          lngMax = lngMid;
        }
      } else {
        const latMid = (latMin + latMax) / 2;
        if (bitValue === 1) {
          latMin = latMid;
        } else {
          latMax = latMid;
        }
      }
      evenBit = !evenBit;
    }
  }

  return {
    lat: (latMin + latMax) / 2,
    lng: (lngMin + lngMax) / 2,
  };
}

/**
 * Get bounding box for a geohash
 * @param geohash Geohash string
 * @returns Bounding box with min/max lat/lng
 */
export function geohashBounds(geohash: string): GeohashBounds {
  let evenBit = true;
  let latMin = -90,
    latMax = 90;
  let lngMin = -180,
    lngMax = 180;

  for (let i = 0; i < geohash.length; i++) {
    const char = geohash[i];
    const idx = BASE32.indexOf(char);

    if (idx === -1) {
      throw new Error(`Invalid geohash character: ${char}`);
    }

    for (let bit = 4; bit >= 0; bit--) {
      const bitValue = (idx >> bit) & 1;

      if (evenBit) {
        const lngMid = (lngMin + lngMax) / 2;
        if (bitValue === 1) {
          lngMin = lngMid;
        } else {
          lngMax = lngMid;
        }
      } else {
        const latMid = (latMin + latMax) / 2;
        if (bitValue === 1) {
          latMin = latMid;
        } else {
          latMax = latMid;
        }
      }
      evenBit = !evenBit;
    }
  }

  return {
    sw: { lat: latMin, lng: lngMin },
    ne: { lat: latMax, lng: lngMax },
  };
}

/**
 * Calculate geohash neighbors
 * @param geohash Center geohash
 * @returns Array of 8 neighboring geohashes
 */
export function geohashNeighbors(geohash: string): string[] {
  const center = decodeGeohash(geohash);
  const bounds = geohashBounds(geohash);

  const latStep = bounds.ne.lat - bounds.sw.lat;
  const lngStep = bounds.ne.lng - bounds.sw.lng;

  const neighbors: string[] = [];

  for (let latOffset = -1; latOffset <= 1; latOffset++) {
    for (let lngOffset = -1; lngOffset <= 1; lngOffset++) {
      if (latOffset === 0 && lngOffset === 0) continue; // Skip center

      const lat = center.lat + latOffset * latStep;
      const lng = center.lng + lngOffset * lngStep;

      // Handle edge cases
      if (lat < -90 || lat > 90) continue;
      const normalizedLng = ((lng + 180) % 360) - 180;

      neighbors.push(encodeGeohash(lat, normalizedLng, geohash.length));
    }
  }

  return neighbors;
}

/**
 * Get geohash prefixes for bounding box search
 * Returns array of geohash prefixes that cover the bounding box
 * @param bbox Bounding box
 * @param precision Geohash precision
 * @returns Array of geohash prefixes
 */
export function geohashPrefixesForBoundingBox(
  bbox: BoundingBox,
  precision = 5
): string[] {
  const prefixes = new Set<string>();

  // Sample points in grid across bounding box
  const latSteps = Math.max(2, Math.ceil((bbox.maxLat - bbox.minLat) * 20));
  const lngSteps = Math.max(2, Math.ceil((bbox.maxLng - bbox.minLng) * 20));

  const latStep = (bbox.maxLat - bbox.minLat) / latSteps;
  const lngStep = (bbox.maxLng - bbox.minLng) / lngSteps;

  for (let i = 0; i <= latSteps; i++) {
    for (let j = 0; j <= lngSteps; j++) {
      const lat = bbox.minLat + i * latStep;
      const lng = bbox.minLng + j * lngStep;

      const geohash = encodeGeohash(lat, lng, precision);
      prefixes.add(geohash);
    }
  }

  return Array.from(prefixes);
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Create bounding box from center point and radius
 * @param center Center coordinates
 * @param radiusKm Radius in kilometers
 * @returns Bounding box
 */
export function createBoundingBox(
  center: Coordinates,
  radiusKm: number
): BoundingBox {
  const latDelta = (radiusKm / 111.32); // ~111.32 km per degree latitude
  const lngDelta = radiusKm / (111.32 * Math.cos(toRadians(center.lat)));

  return {
    minLat: center.lat - latDelta,
    maxLat: center.lat + latDelta,
    minLng: center.lng - lngDelta,
    maxLng: center.lng + lngDelta,
  };
}

/**
 * Check if coordinates are within bounding box
 * @param coords Coordinates to check
 * @param bbox Bounding box
 * @returns True if within bounds
 */
export function isWithinBoundingBox(
  coords: Coordinates,
  bbox: BoundingBox
): boolean {
  return (
    coords.lat >= bbox.minLat &&
    coords.lat <= bbox.maxLat &&
    coords.lng >= bbox.minLng &&
    coords.lng <= bbox.maxLng
  );
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Geohash precision reference:
 * 1: ±2500 km
 * 2: ±630 km
 * 3: ±78 km
 * 4: ±20 km
 * 5: ±2.4 km
 * 6: ±610 m
 * 7: ±76 m (recommended for city-level search)
 * 8: ±19 m
 * 9: ±2.4 m
 */
export const GEOHASH_PRECISION = {
  COUNTRY: 2,
  REGION: 3,
  CITY: 5,
  NEIGHBORHOOD: 6,
  STREET: 7,
  BUILDING: 8,
  PRECISE: 9,
} as const;
