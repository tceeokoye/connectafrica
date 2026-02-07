"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const ImpactStorySection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-black/80 via-emerald-900/40 to-black/80 backdrop-blur-xl text-white overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent_50%)]" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gold/30 flex items-center justify-center mx-auto mb-10 shadow-lg"
          >
            <Quote className="w-12 h-12 sm:w-14 sm:h-14 text-gold" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight text-white"
          >
            "Now We Can Treat Our Patients with{" "}
            <span className="text-gold">Dignity</span>"
          </motion.h2>

          {/* Story Paragraphs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 text-lg sm:text-xl leading-relaxed text-white/80"
          >
            <p>
              Last year, Connect with Africa coordinated the delivery of a container 
              of medical supplies to Northern Nigeria. As the nurses unpacked the boxes, 
              many of them wept.
            </p>

            <p className="italic">"Now we can treat our patients with dignity," they said.</p>

            <p>
              What seemed like simple items — gloves, dressings, basic tools — became 
              the difference between turning patients away and providing safe, respectful care.
              <span className="block mt-4 text-gold font-semibold">
                Your support makes stories like this possible.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStorySection;
