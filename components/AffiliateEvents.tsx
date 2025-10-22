"use client";

import { motion } from "framer-motion";
import { Filter, Music, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EventCard from "./EventCard";
import useAffiliateTracking from "../hooks/useAffiliateTracking";

interface AffiliateEvent {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  venue: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  image_url?: string;
  ticket_url: string;
  affiliate_source: 'eventbrite' | 'ticketmaster' | 'dice';
  affiliate_code: string;
  affiliate_commission: number;
}

const genres = [
  "All",
  "Techno",
  "House", 
  "Electronic",
  "Jazz",
  "Folk",
  "Live Music",
];

const affiliateSources = [
  "All",
  "Eventbrite",
  "Ticketmaster", 
  "DICE",
];

export default function AffiliateEvents() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [events, setEvents] = useState<AffiliateEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { trackClick } = useAffiliateTracking();
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedSource !== "All") {
        params.append('source', selectedSource.toLowerCase());
      }
      params.append('limit', '50');
      
      const response = await fetch(`/api/affiliates?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/affiliates/refresh', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh events');
      }
      
      // Refetch events after refresh
      await fetchEvents();
    } catch (err) {
      console.error('Error refreshing events:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh events');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTicketClick = async (eventId: string, affiliateCode: string) => {
    await trackClick(eventId, affiliateCode);
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedSource]);

  const filteredEvents = events.filter(event => {
    if (selectedGenre === "All") return true;
    
    // Simple genre filtering based on event name/description
    const eventText = `${event.name} ${event.description || ''}`.toLowerCase();
    return eventText.includes(selectedGenre.toLowerCase());
  });

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A6A6] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-[#003A4D] mb-6">
            Partner Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover events from our trusted partners with instant ticket purchasing
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-[#003A4D] mr-2 mt-1" />
            
            {/* Genre Filters */}
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full font-poppins font-medium transition-all duration-300 border-2 ${
                  selectedGenre === genre
                    ? "bg-[#00A6A6] text-white border-[#00A6A6] shadow-lg"
                    : "bg-white text-[#003A4D] border-gray-300 hover:bg-[#00A6A6] hover:text-white hover:border-[#00A6A6] shadow-md"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Source Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {affiliateSources.map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`px-4 py-2 rounded-full font-poppins font-medium transition-all duration-300 border-2 ${
                  selectedSource === source
                    ? "bg-[#003A4D] text-white border-[#003A4D] shadow-lg"
                    : "bg-white text-[#003A4D] border-gray-300 hover:bg-[#003A4D] hover:text-white hover:border-[#003A4D] shadow-md"
                }`}
              >
                {source}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-white text-[#00A6A6] px-6 py-3 rounded-full font-poppins font-medium border-2 border-[#00A6A6] hover:bg-[#00A6A6] hover:text-white transition-all duration-300 shadow-md flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Events'}
          </button>
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600 text-center">{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mx-auto block"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EventCard
                  event={event}
                  onTicketClick={handleTicketClick}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-[#00A6A6]/10 backdrop-blur-sm rounded-2xl p-8">
              <Music className="w-12 h-12 text-[#00A6A6] mx-auto mb-4" />
              <h3 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
                No Events Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No events match your current filters. Try adjusting your search criteria or refresh to get the latest events.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
