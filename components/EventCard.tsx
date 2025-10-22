"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Ticket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

interface EventCardProps {
  event: AffiliateEvent;
  onTicketClick?: (eventId: string, affiliateCode: string) => void;
}

export default function EventCard({ event, onTicketClick }: EventCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleTicketClick = async () => {
    if (onTicketClick) {
      setIsLoading(true);
      try {
        await onTicketClick(event.id, event.affiliate_code);
      } catch (error) {
        console.error('Error tracking ticket click:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    // Open ticket URL in new tab
    window.open(event.ticket_url, '_blank', 'noopener,noreferrer');
  };

  const getAffiliateBadgeColor = (source: string) => {
    switch (source) {
      case 'eventbrite':
        return 'bg-orange-500';
      case 'ticketmaster':
        return 'bg-red-500';
      case 'dice':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAffiliateBadgeText = (source: string) => {
    switch (source) {
      case 'eventbrite':
        return 'Eventbrite';
      case 'ticketmaster':
        return 'Ticketmaster';
      case 'dice':
        return 'DICE';
      default:
        return 'Partner';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-video bg-gray-200 overflow-hidden flex-shrink-0">
        <Image
          src={event.image_url || '/images/hero-festival.jpg'}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Affiliate source badge */}
        <div className={`absolute top-4 right-4 ${getAffiliateBadgeColor(event.affiliate_source)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {getAffiliateBadgeText(event.affiliate_source)}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-montserrat font-bold text-[#003A4D] mb-3 min-h-[3rem]">
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-[#00A6A6]" />
            <span>{formatDate(event.start_date)} at {formatTime(event.start_date)}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-[#00A6A6]" />
            <span className="truncate">{event.venue.name}</span>
          </div>
        </div>

        {event.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {event.description}
          </p>
        )}

        <div className="mt-auto">
          <button
            onClick={handleTicketClick}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white py-3 rounded-lg font-poppins font-medium hover:shadow-lg transition-all duration-300 hover:from-[#00536B] hover:to-[#00A6A6] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4" />
                Buy Tickets
                <ExternalLink className="w-3 h-3" />
              </>
            )}
          </button>
          
          {/* Commission info for debugging */}
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Commission: {(event.affiliate_commission * 100).toFixed(1)}%
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
