"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/assets/hero-img/hospitalSuply.jpeg",
    title: "Connecting Compassion to Communities in Need",
    subtitle: "Strengthening African clinics, schools, and communities with life-saving supplies, sustainable partnerships, and hope in action.",
    description: "",
  },
  {
    image: "/assets/hero-img/education-support-hero.jpg",
    title: "Education & Training (Future Focus)",
    subtitle: "Supporting capacity building, health education, and partnerships that strengthen systems beyond a single shipment.",
    description: "",
  },
  {
    image: "/assets/hero-img/community-development-hero.jpg",
    title: "Community Partnerships",
    subtitle: "Working directly with local leaders, nurses, and administrators to ensure supplies reach the people who need them most.",
    description: "",
  },
  {
    image: "/assets/hero-img/clean-water-hero.jpg",
    title: "Diaspora & Global Engagement",
    subtitle: "Connecting individuals, companies, and institutions around the world to meaningful, trackable projects in Africa.",
    description: "",
  },
];

export default function HeroSectionModern3D() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background image with slow cinematic motion */}
      <AnimatePresence >
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.3, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
            animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
          {/* Green overlay */}
          <div className="absolute inset-0 bg-emerald-400/10 " />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/80 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              {slide.subtitle}
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              {slide.title}
            </h1>

            <p className="text-lg text-white/80 max-w-xl">
              {slide.description}
            </p>

            <div className="flex flex-col md:flex-row mb-12 md:mb-0 gap-4">
              <Link href="/donate">
                <button className="px-8 py-4 bg-white text-black rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">
                  Donate Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

              <Link href="/about">
                <button className="px-8 py-4 border border-white/40 rounded-xl hover:bg-white/10 transition">
                  Learn About Our Work
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right 3D Glass Card */}
          <div className="hidden lg:flex justify-center perspective-1000">
            <motion.div
              key={slide.image + "card"}
              initial={{ rotateY: -20, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-[420px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="rounded-2xl overflow-hidden mb-6">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
              <p className="text-sm text-white/70">Impact across Africa</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute  bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i === index ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
