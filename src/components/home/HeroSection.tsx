"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image: "/assets/hero-img/hospitalSuply.jpeg",
    tag: "Direct Medical Delivery",
    caption: "Supplying frontline clinics with life-saving equipment",
  },
  {
    image: "/assets/hero-img/community-development-hero.jpg",
    tag: "Frontline Healthcare Workers",
    caption: "Equipping nurses and healthcare staff across African communities",
  },
  {
    image: "/assets/hero-img/clean-water-hero.jpg",
    tag: "Rural Clinic Support",
    caption: "Bridging critical resource shortages in underserved areas",
  },
  {
    image: "/assets/hero-img/education-support-hero.jpg",
    tag: "Sustainable Community Health",
    caption: "Creating long-term pathways for community health and dignity",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[index];

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-slate-950 text-white pt-28 pb-20">
      {/* Background Image Carousel with Cinematic Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url('${currentSlide.image}')` }}
          />
          {/* Rich Gradient Overlays for High Legibility while Keeping Photos Visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
              Empowering Those Who Serve.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Saving Lives Across Africa.
              </span>
            </h1>

            <div className="space-y-4 max-w-2xl text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
              <p className="font-medium text-white/95">
                Connect with Africa is a humanitarian initiative dedicated to bridging global generosity with local needs across African communities.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We work alongside clinics, healthcare workers, community leaders, and development partners to deliver critical medical supplies, strengthen frontline healthcare, and create pathways for sustainable community development.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link href="/donate">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-3 transition-colors text-base"
                >
                  <span>DONATE NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="#impact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-gray-100 hover:text-white font-semibold rounded-xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2 transition-colors text-base"
                >
                  <span>SEE OUR IMPACT</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Floating 3D Image Card */}
        
        </div>

        {/* Mobile Slide Dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-8">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-emerald-400"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
