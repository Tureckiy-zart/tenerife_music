"use client";

import { motion } from "framer-motion";
import { Bell, Calendar, Filter, MapPin, Music, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  genre: string;
  image: string;
  description: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Sunset Techno Session",
    date: "Nov 15, 2024",
    venue: "Papagayo Beach Club",
    genre: "Techno",
    image: "https://i.ytimg.com/vi/BPc7JErNdHI/maxresdefault.jpg",
    description:
      "Experience the ultimate sunset techno session with international DJs",
  },
  {
    id: 2,
    title: "Carnival Beats Festival",
    date: "Dec 20, 2024",
    venue: "Plaza del Adelantado",
    genre: "Folk",
    image:
      "https://www.opodo.co.uk/blog/wp-content/uploads/sites/12/2024/02/carnaval_tenerife.jpg",
    description:
      "Traditional Canarian music meets modern beats in this cultural celebration",
  },
  {
    id: 3,
    title: "Electronic Waves",
    date: "Jan 10, 2025",
    venue: "Tramps Tenerife",
    genre: "Electronic",
    image:
      "https://i3.wp.com/estaticos-cdn.prensaiberica.es/clip/51955172-575c-4b21-aa6b-e262d7a072a0_16-9-discover-aspect-ratio_default_0.jpg",
    description:
      "Underground electronic music showcase featuring local and international artists",
  },
  {
    id: 4,
    title: "Jazz Under the Stars",
    date: "Feb 5, 2025",
    venue: "Auditorio de Tenerife",
    genre: "Jazz",
    image:
      "https://www.auditoriodetenerife.com/wp-content/uploads/2025/02/20241205132043_(c)%20Auditorio%20de%20Tenerife-Efra%C3%ADn%20Pinto-scaled.jpg",
    description:
      "An elegant evening of jazz music in Tenerife's premier concert hall",
  },
  {
    id: 5,
    title: "Beach House Vibes",
    date: "Feb 20, 2025",
    venue: "Monkey Beach Club",
    genre: "House",
    image: "https://i.ytimg.com/vi/cpwBoLvNQIM/maxresdefault.jpg",
    description:
      "House music party right on the beach with ocean views and sunset vibes",
  },
  {
    id: 6,
    title: "Underground Pulse",
    date: "Mar 8, 2025",
    venue: "NRG Club",
    genre: "Techno",
    image: "https://canaryvip.com/wp-content/uploads/2024/03/24673.jpg",
    description: "Deep techno sounds in Tenerife's hottest underground venue",
  },
  {
    id: 7,
    title: "Canarian Folk Night",
    date: "Mar 25, 2025",
    venue: "Casa de la Cultura",
    genre: "Folk",
    image: "https://i.ytimg.com/vi/jVrUwebo2NY/maxresdefault.jpg",
    description:
      "Celebrate traditional Canarian music with authentic instruments and performances",
  },
  {
    id: 8,
    title: "Ocean House Festival",
    date: "Apr 12, 2025",
    venue: "Costa Adeje",
    genre: "House",
    image:
      "https://whenincanarias.wordpress.com/wp-content/uploads/2024/03/tenerife-music-festivals.jpg",
    description:
      "Multi-day house music festival with ocean backdrop and world-class DJs",
  },
];

const genres = [
  "All",
  "Techno",
  "House",
  "Electronic",
  "Jazz",
  "Folk",
  "Live Music",
];

export default function Events() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredEvents =
    selectedGenre === "All"
      ? mockEvents
      : mockEvents.filter((event) => event.genre === selectedGenre);

  const ComingSoonModal = () => {
    if (!showComingSoon) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowComingSoon(false)}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 pb-10 max-w-md w-full mx-4">
          <button
            onClick={() => setShowComingSoon(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="bg-[#00A6A6] p-3 rounded-full w-fit mx-auto mb-4">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
              Tickets Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We're working with event organizers to bring you seamless ticket
              purchasing. Subscribe to get notified when tickets become
              available for this event!
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="bg-[#00A6A6] hover:bg-[#00C4C4] text-white px-6 py-3 rounded-full font-poppins font-semibold transition-colors duration-200 w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

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
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the hottest music events happening across Tenerife
          </p>

          {/* Genre Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Filter className="w-5 h-5 text-[#003A4D] mr-2 mt-1" />
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
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowComingSoon(true)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-video bg-gray-200 overflow-hidden flex-shrink-0">
                <Image
                  src={event.image || '/images/hero-festival.jpg'}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#00A6A6] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {event.genre}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-montserrat font-bold text-[#003A4D] mb-3 min-h-[3rem]">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-[#00A6A6]" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-[#00A6A6]" />
                    {event.venue}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {event.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowComingSoon(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#003A4D] to-[#00536B] text-white py-2 rounded-lg font-poppins font-medium hover:shadow-lg transition-all duration-300 hover:from-[#00536B] hover:to-[#00A6A6] mt-auto"
                >
                  Coming Soon
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-[#00A6A6]/10 backdrop-blur-sm rounded-2xl p-8">
            <Music className="w-12 h-12 text-[#00A6A6] mx-auto mb-4" />
            <h3 className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
              Full Agenda Coming Soon
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're curating the complete events calendar for Tenerife. Stay
              tuned for ticket sales and more events!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Coming Soon Modal */}
      {/* <ComingSoonModal /> */}
    </section>
  );
}
