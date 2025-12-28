"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Stethoscope,
  GraduationCap,
  Home,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/assets/hero-img/hospitalSuply.jpeg",
    title: "Medical Supply Campaigns",
    subtitle: "Delivering Life-Saving Equipment",
    description:
      "Equipping African clinics with essential medical supplies, equipment, and resources to save lives and strengthen healthcare systems.",
    icon: Stethoscope,
  },
  {
    image: "/assets/hero-img/education-support-hero.jpg",
    title: "Education Support",
    subtitle: "Empowering Future Leaders",
    description:
      "Providing schools with learning materials, infrastructure support, and scholarship programs to unlock the potential of African youth.",
    icon: GraduationCap,
  },
  {
    image: "/assets/hero-img/community-development-hero.jpg",
    title: "Community Development",
    subtitle: "Building Stronger Communities",
    description:
      "Supporting sustainable community projects that create lasting change, from housing to agricultural initiatives across Africa.",
    icon: Home,
  },
  {
    image: "/assets/hero-img/clean-water-hero.jpg",
    title: "Clean Water Projects",
    subtitle: "Access to Safe Water",
    description:
      "Installing wells and water purification systems to provide clean, safe drinking water to communities in need.",
    icon: Droplets,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPuzzle, setShowPuzzle] = useState(true);

  /* ---------------- SLIDE ROTATION ---------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= slides.length ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 transition-colors duration-700 bg-earth" />

      {/* PUZZLE / FIRST SLIDE BG */}
      <AnimatePresence>
        {showPuzzle && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ scale: 0.2 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            onAnimationComplete={() => setShowPuzzle(false)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-earth/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SLIDE BACKGROUND */}
      <AnimatePresence mode="sync">
        {!showPuzzle && (
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-earth/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT (always rendered) */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium">
                {Icon && <Icon className="w-4 h-4" />}
                {slide.subtitle}
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-foreground mb-6">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl text-earth-foreground/90 mb-8">
              {slide.description}
            </p>

            <div className="flex gap-4">
              <Link href="/donate">
                <Button size="lg" className="hidden md:flex">
                  Donate Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/medical-container">
                <Button size="lg" className="bg-gold">
                  View Our Campaigns
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT PREVIEW CARD */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-earth-foreground/10 backdrop-blur-md rounded-3xl p-8 border shadow-2xl"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{slide.title}</div>
                    <div className="text-sm opacity-70">
                      Connect with Africa
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
