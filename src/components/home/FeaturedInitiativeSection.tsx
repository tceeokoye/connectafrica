"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, PackageCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import supplyImg from "@/assets/hospitalSuply.jpeg";

const donationItems = [
  "Hospital beds",
  "Medical equipment",
  "Diagnostic tools",
  "PPE",
  "Maternity supplies",
  "Patient-care equipment",
  "Medical consumables",
  "Mobility equipment",
  "Laboratory supplies",
];

export const FeaturedInitiativeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-emerald-900/30">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                FEATURED INITIATIVE: Medical Supplies for Africa
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Give Healthcare Workers the Tools to Save Lives
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Many healthcare professionals are ready to serve—but lack basic medical resources. Our Medical Supplies Initiative collects and coordinates essential healthcare supplies and equipment for clinics, hospitals, and community healthcare programs.
              </p>

              {/* Items Provided */}
              <div className="pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4" />
                  Your Donation Can Help Provide:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {donationItems.map((item) => (
                    <div
                      key={item}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5 text-xs sm:text-sm text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/donate">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <span>HELP EQUIP A CLINIC</span>
                  </motion.button>
                </Link>

                <Link href="/get-involved#donate-supplies">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 flex items-center justify-center gap-2 text-sm sm:text-base transition-colors"
                  >
                    <span>DONATE MEDICAL SUPPLIES</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-72 sm:h-96 lg:h-[450px]">
                <Image
                  src={supplyImg}
                  alt="Medical supplies distribution"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                  <p className="text-white font-bold text-sm">Direct Clinic Delivery</p>
                  <p className="text-emerald-400 text-xs mt-0.5">Moving supplies to communities in urgent need</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInitiativeSection;
