# Tenerife Music Core Dataset v1.0

A comprehensive, geocoded music event dataset for Tenerife, Canary Islands, Spain.

## 📊 Dataset Overview

- **Version:** 1.0
- **Total Events:** 70
- **Total Venues:** 15
- **Date Range:** June 29, 2024 - June 25, 2026 (~24 months)
- **Region:** Tenerife, Canary Islands, Spain
- **Last Updated:** October 16, 2025
- **License:** CC BY 4.0

## 📁 Dataset Files

### `events_tenerife.json`
Complete event dataset with standardized schema including:
- Unique event IDs
- Event details (name, type, description)
- Categorization (genres, tags)
- Temporal data (dates with timezone)
- Venue information with geocoded coordinates
- Pricing information
- Performer details
- Image and ticket URLs
- Source attribution
- Quality scores

**Schema:**
```json
{
  "event_id": "tenerife_music_YYYYMMDD_###",
  "name": "Event Name",
  "type": "concert|festival|opera|club_night|...",
  "genres": ["genre1", "genre2"],
  "tags": ["indoor|outdoor", "beach", "club", "festival", ...],
  "start_date": "ISO 8601 with timezone",
  "end_date": "ISO 8601 with timezone",
  "timezone": "Atlantic/Canary",
  "venue": {
    "venue_id": "venue_########",
    "name": "Venue Name",
    "address": "Full Address",
    "coordinates": {"lat": 28.xxxx, "lng": -16.xxxx}
  },
  "price_min": 0,
  "price_max": 100,
  "currency": "EUR",
  "description": "Event description",
  "performers": ["Artist 1", "Artist 2"],
  "image_url": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/multiple-artist-performing-concert-flyer-design-template-ae94c9b8e30762a9e3895b84a6b5d2c3_screen.jpg?ts=1636990481",
  "ticket_url": "https://e98f89a2.delivery.rocketcdn.me/wp-content/uploads/2021/02/Photoshop-Flyer-Template-for-Artist-1.jpg.webp",
  "source": "Source Name",
  "source_url": "https://i.etsystatic.com/19654473/r/il/8500bf/6408357703/il_1080xN.6408357703_scb1.jpg",
  "created_at": "ISO 8601 UTC",
  "metadata": {
    "region": "Tenerife, Canary Islands, Spain",
    "data_version": "1.0",
    "quality_score": 0-100
  }
}
```

### `venues_tenerife.json`
Venue dataset with geocoded coordinates:
```json
{
  "venue_id": "venue_########",
  "name": "Venue Name",
  "address": "Full Address",
  "coordinates": {"lat": 28.xxxx, "lng": -16.xxxx},
  "type": "concert_hall|beach_club|nightclub|park|...",
  "website": "https://...",
  "events_count": 0
}
```

### `collection_report.md`
Comprehensive analysis report including:
- Executive summary
- Collection statistics (by source, year, type, genre)
- Venue statistics and geocoding results
- URL validation results
- Date range coverage
- Genre distribution analysis
- Pricing analysis
- Data quality metrics
- Geographic coverage
- Issues and warnings
- Recommendations for Phase 2

## 📈 Key Statistics

- **Data Quality:** 92.4/100 average score
- **Geocoding Success:** 86.7% (13/15 venues)
- **Geographic Coverage:** 85.7% of events have coordinates
- **Unique Genres:** 41 classified genres
- **Event Tags:** 9 different tags applied
- **Free Events:** 14.3%
- **Paid Events:** 85.7%

## 🎵 Event Types

- Concert (55.7%)
- Festival (12.9%)
- Opera (10.0%)
- Club Night (7.1%)
- DJ Night (4.3%)
- Live Music (2.9%)
- Other (7.1%)

## 📍 Top Venues

1. **Auditorio de Tenerife** - 33 events (concert hall)
2. **Auditorio de Tenerife - Sala de Cámara** - 15 events (concert hall)
3. **Papagayo Beach Club** - 5 events (beach club)
4. **Tramps Tenerife** - 5 events (nightclub)
5. Other venues - 12 events

## 🎼 Top Genres

1. Classical (24.4%)
2. Symphonic (8.0%)
3. Electronic (7.4%)
4. Opera (5.1%)
5. Contemporary (4.5%)
6. Baroque (4.0%)
7. Chamber Music (3.4%)
8. Latin (3.4%)
9. House (3.4%)
10. Family (2.8%)

## 🏷️ Available Tags

- `indoor` - Indoor venues (48 events)
- `outdoor` - Outdoor venues (5 events)
- `beach` - Beach venues (5 events)
- `club` - Nightclub/club venues (10 events)
- `festival` - Festival events (9 events)
- `free-entry` - Free events (10 events)
- `family` - Family-friendly events (5 events)
- `djset` - DJ sets (3 events)
- `weekly` - Weekly recurring events (5 events)

## 💶 Pricing

- **Average Min Price:** €20.29
- **Average Max Price:** €51.64
- **Price Range:** €0 - €800
- **Free Events:** 10 (14.3%)

## 🗓️ Temporal Coverage

- **Earliest Event:** June 29, 2024
- **Latest Event:** June 25, 2026
- **Coverage:** ~24 months (726 days)

**Events by Year:**
- 2024: 7.1%
- 2025: 54.3%
- 2026: 38.6%

## 🌐 Data Sources

1. **Auditorio de Tenerife** (68.6%) - Official concert hall website
2. **HelloCanaryIslands** (11.4%) - Tourism and events portal
3. **Papagayo Beach Club** (7.1%) - Beach club website
4. **Tramps Tenerife** (7.1%) - Nightclub website
5. **Eventbrite** (5.7%) - Event platform

## 🔧 Data Processing

The dataset was processed using a comprehensive pipeline that includes:

1. **Data Normalization:** Standardized schema with unique IDs
2. **Geocoding:** Venue addresses geocoded using OpenStreetMap Nominatim API
3. **URL Validation:** HTTP HEAD requests to verify image and ticket URLs
4. **Genre Classification:** Mapping to standardized genre taxonomy
5. **Tag Generation:** Automatic tagging based on event characteristics
6. **Quality Scoring:** Data completeness and validity scoring
7. **Validation:** Duplicate removal, required field validation, coordinate bounds checking

## 📝 Usage Examples

### Load Events in Python
```python
import json

with open('events_tenerife.json', 'r') as f:
    events = json.load(f)

# Filter by genre
classical_events = [e for e in events if 'classical' in e['genres']]

# Filter by date range
from datetime import datetime
upcoming = [e for e in events if e['start_date'] > datetime.now().isoformat()]

# Filter by tags
beach_events = [e for e in events if 'beach' in e['tags']]
free_events = [e for e in events if 'free-entry' in e['tags']]
```

### Load Venues in JavaScript
```javascript
const fs = require('fs');
const venues = JSON.parse(fs.readFileSync('venues_tenerife.json'));

// Get venues with coordinates
const geocoded = venues.filter(v => v.coordinates.lat);

// Sort by event count
venues.sort((a, b) => b.events_count - a.events_count);
```

## ⚠️ Known Limitations

1. **Image URLs:** No valid image URLs in current dataset (0% coverage)
2. **Ticket URLs:** 24.3% validation success rate (some URLs may be invalid or require authentication)
3. **Geocoding:** 2 venues failed geocoding (Papagayo Beach Club, Tramps Tenerife)
   - Manual coordinate entry may be needed for 100% coverage

## 🚀 Future Enhancements (Phase 2)

- [ ] Image collection for all events
- [ ] Manual geocoding for remaining 2 venues
- [ ] Additional data sources and venues
- [ ] Real-time updates and automated scraping
- [ ] Social media integration
- [ ] User reviews and ratings
- [ ] Historical event data
- [ ] REST API development
- [ ] Interactive map visualization dashboard
- [ ] Multilingual support (Spanish/English)

## 📜 License

This dataset is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

**Attribution:** Please cite this dataset as:
```
Tenerife Music Core Dataset v1.0 (2025)
https://github.com/your-username/tenerife-music-dataset
```

## 🤝 Contributing

Contributions are welcome! Please submit issues or pull requests for:
- Additional event sources
- Data corrections
- Enhancement suggestions
- Bug reports

## 📧 Contact

For questions, suggestions, or collaboration opportunities, please open an issue on GitHub.

---

**Generated:** October 16, 2025  
**Version:** 1.0  
**Status:** Phase 1 Complete ✓
