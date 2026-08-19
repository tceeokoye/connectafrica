"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, Stethoscope, Droplets, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image: "/assets/hero-img/hospitalSuply.jpeg",
    tag: "Direct Medical Delivery",
    tagIcon: Heart,
    headline: "Supplying Frontline Clinics With Life-Saving Equipment",
    subheading:
      "Every donation delivers critical medical supplies directly into the hands of healthcare workers who need them most across African communities.",
  },
  {
    image: "/assets/hero-img/community-development-hero.jpg",
    tag: "Frontline Healthcare Workers",
    tagIcon: Stethoscope,
    headline: "Equipping Nurses & Healthcare Staff Across Africa",
    subheading:
      "We partner with clinics and hospitals to ensure frontline workers have the tools they need to provide dignified, effective care.",
  },
  {
    image: "/assets/hero-img/clean-water-hero.jpg",
    tag: "Rural Clinic Support",
    tagIcon: Droplets,
    headline: "Bridging Critical Resource Shortages in Underserved Areas",
    subheading:
      "Remote and rural communities deserve the same quality of care. We connect generous donors with clinics that need support the most.",
  },
  {
    image: "/assets/hero-img/education-support-hero.jpg",
    tag: "Sustainable Community Health",
    tagIcon: GraduationCap,
    headline: "Creating Long-Term Pathways for Community Health & Dignity",
    subheading:
      "Beyond one-time deliveries, we build lasting partnerships that strengthen healthcare systems and empower African communities.",
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
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-green-950 text-white pt-28 pb-20">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${currentSlide.image}')` }}
          />
          {/* Semi-transparent overlays — image shows through clearly */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Content — changes with each slide */}
          <div className="lg:col-span-7 space-y-8">

            {/* Tag Badge — slides in/out with image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${index}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5 }}
              >
                {(() => {
                  const Icon = currentSlide.tagIcon;
                  return (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/25 border border-green-400/40 text-green-300 text-xs sm:text-sm font-bold uppercase tracking-widest backdrop-blur-md">
                      <Icon className="w-4 h-4" />
                      {currentSlide.tag}
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Headline — animates per slide */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${index}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
              >
                {currentSlide.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Subheading — animates per slide */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                {currentSlide.subheading}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons — static, always visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <Link href="/donate">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-xl shadow-green-900/60 flex items-center justify-center gap-3 transition-colors text-base"
                >
                  <span>DONATE NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="#impact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-md flex items-center justify-center gap-2 transition-colors text-base"
                >
                  <span>SEE OUR IMPACT</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Dots + Counter */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-8 bg-green-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <span className="text-white/50 text-xs font-mono">
            {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}


