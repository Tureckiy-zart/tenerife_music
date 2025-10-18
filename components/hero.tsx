"use client";

import { Bell, Calendar, MapPin, Music, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SubscriptionModal from "./subscription-modal";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const previewPreviouslyFocusedRef = useRef<HTMLElement | null>(null);

  const heroImages = [
    "https://cdn.abacus.ai/images/906a0156-c4ba-43ff-8c30-45143b6c3c22.png",
    "https://cdn.abacus.ai/images/267e4eea-3b3f-4f5d-8ddb-53d1bfadb399.png",
    "https://cdn.abacus.ai/images/57a74454-0e31-4476-9643-0c5f518b36ad.png",
    "https://cdn.abacus.ai/images/de2ee128-4b98-450a-b278-2f8fdb5829e7.png",
    "https://cdn.abacus.ai/images/fa8964d4-c52e-42d0-815b-3d3c007c6d9d.png",
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const PreviewModal = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="preview-title">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4" tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowPreview(false);
              previewPreviouslyFocusedRef.current?.focus();
            }
          }}
        >
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="bg-[#00A6A6] p-3 rounded-full w-fit mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h3 id="preview-title" className="text-2xl font-montserrat font-bold text-[#003A4D] mb-4">
              Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We're creating an amazing preview video showcasing Tenerife's
              incredible music scene. Stay tuned for stunning footage of our
              festivals, venues, and local artists!
            </p>
            <button
              onClick={() => {
                setShowPreview(false);
                setShowModal(true);
              }}
              className="bg-[#00A6A6] hover:bg-[#00C4C4] text-white px-6 py-3 rounded-full font-poppins font-semibold transition-colors duration-200"
            >
              Notify Me When Ready
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Tenerife Music Scene ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#003A4D]/40 via-[#003A4D]/20 to-[#003A4D]/70" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="bg-[#00A6A6]/20 p-4 rounded-full backdrop-blur-sm">
          <Music className="w-8 h-8 text-[#00A6A6]" />
        </div>
      </div>
      <div
        className="absolute top-40 right-16 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
          <Calendar className="w-6 h-6 text-white" />
        </div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-float"
        style={{ animationDelay: "4s" }}
      >
        <div className="bg-[#00A6A6]/20 p-3 rounded-full backdrop-blur-sm">
          <MapPin className="w-6 h-6 text-[#00A6A6]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-24 md:pt-32">
        <div>
          <div className="bg-black/30 backdrop-blur-md rounded-3xl p-6 md:p-8 mb-6 md:mb-8 inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-montserrat font-bold mb-4 md:mb-6 leading-tight">
              <span className="block drop-shadow-lg">Your Music Guide</span>
              <span className="block text-[#00A6A6] drop-shadow-lg">
                to Tenerife
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl font-poppins font-light max-w-2xl mx-auto drop-shadow-md">
              Coming soon — your complete festival and party aggregator
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setShowModal(true)}
              className="group bg-[#00A6A6] hover:bg-[#00C4C4] text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all duration-300 flex items-center space-x-3 glow-effect"
            >
              <Bell className="w-5 h-5" />
              <span>Subscribe for Launch Updates</span>
            </button>

            <button
              onClick={(e) => {
                previewPreviouslyFocusedRef.current = e.currentTarget as HTMLElement;
                setShowPreview(true);
              }}
              className="group flex items-center space-x-3 text-white hover:text-[#00A6A6] transition-all duration-300"
            >
              <div className="bg-white/20 hover:bg-[#00A6A6]/20 p-3 rounded-full backdrop-blur-sm">
                <Play className="w-6 h-6" />
              </div>
              <span className="font-poppins font-medium">Watch Preview</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-montserrat font-bold text-[#00A6A6] mb-2 drop-shadow-lg">
              100+
            </div>
            <div className="text-sm md:text-base text-white drop-shadow-md">
              Events Coming
            </div>
          </div>
          <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-montserrat font-bold text-[#00A6A6] mb-2 drop-shadow-lg">
              50+
            </div>
            <div className="text-sm md:text-base text-white drop-shadow-md">
              Venues Listed
            </div>
          </div>
          <div className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-montserrat font-bold text-[#00A6A6] mb-2 drop-shadow-lg">
              24/7
            </div>
            <div className="text-sm md:text-base text-white drop-shadow-md">
              Music Updates
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      {/* <div className="absolute bottom-2 md:bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Modals */}
      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <PreviewModal />
    </section>
  );
}
