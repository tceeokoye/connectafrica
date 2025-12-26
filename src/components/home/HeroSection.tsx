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
    // First slide is the "welcome" text only
    title: "Welcome to Our Mission",
    subtitle: "Making a Difference Together",
    description:
      "Join us as we support communities across Africa with healthcare, education, and sustainable development initiatives.",
    icon: Heart, // optional icon
  },
  {
    image: "/assets/hero-img/hospitalSuply.jpeg",
    title: "Medical Supply Campaigns",
    subtitle: "Delivering Life-Saving Equipment",
    description:
      "Equipping African clinics with essential medical supplies, equipment, and resources to save lives and strengthen healthcare systems.",
    icon: Stethoscope,
    stat: { value: "15+", label: "Partner Clinics" },
  },
  {
    image: "/assets/hero-img/education-support-hero.jpg",
    title: "Education Support",
    subtitle: "Empowering Future Leaders",
    description:
      "Providing schools with learning materials, infrastructure support, and scholarship programs to unlock the potential of African youth.",
    icon: GraduationCap,
    stat: { value: "5K+", label: "Students Reached" },
  },
  {
    image: "/assets/hero-img/community-development-hero.jpg",
    title: "Community Development",
    subtitle: "Building Stronger Communities",
    description:
      "Supporting sustainable community projects that create lasting change, from housing to agricultural initiatives across Africa.",
    icon: Home,
    stat: { value: "20+", label: "Communities" },
  },
  {
    image: "/assets/hero-img/clean-water-hero.jpg",
    title: "Clean Water Projects",
    subtitle: "Access to Safe Water",
    description:
      "Installing wells and water purification systems to provide clean, safe drinking water to communities in need.",
    icon: Droplets,
    stat: { value: "10K+", label: "Lives Impacted" },
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background color for first slide */}
      <div className="absolute inset-0 bg-earth w-full" />

      {/* Only show background image for slides after the first */}
      <AnimatePresence mode="sync">
        {currentSlide !== 0 && (
          <motion.div
            key={currentSlide}
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.2, x: -40 }}
              transition={{ duration: 6, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-earth/70 via-earth/50 to-earth/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gold/10 blur-3xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-primary/10 blur-3xl hidden lg:block"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold text-sm font-medium backdrop-blur-sm border border-gold/30">
                  <IconComponent className="w-4 h-4" />
                  {slide.subtitle}
                </span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-earth-foreground leading-tight mb-6"
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-earth-foreground/90 mb-8"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4">
              {currentSlide !== 0 && (
                <>
                  <Link href="/donate">
                    <Button size="lg" className="px-8 py-6 text-lg hidden md:flex">
                      Donate Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/medical-container">
                    <Button size="lg" className="px-8 py-6 text-lg bg-gold">
                      View Our Campaigns
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Preview Card: only for slides with images */}
          {currentSlide !== 0 && (
            <div className="hidden lg:block">
              <motion.div className="bg-earth-foreground/10 backdrop-blur-md rounded-3xl p-8 border shadow-2xl">
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
                    <div className="text-sm opacity-70">Connect with Africa</div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Indicators */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-gold" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
