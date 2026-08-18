"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const shortages = [
  "Medical supplies",
  "Diagnostic equipment",
  "Personal protective equipment",
  "Hospital beds",
  "Maternity supplies",
  "Surgical supplies",
  "Patient-care equipment",
  "Laboratory supplies",
  "Emergency-care resources",
  "Healthcare infrastructure",
];

export const TheChallengeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4" />
            The Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Healthcare Should Not Depend on Geography
          </h2>
          <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            <p>
              Across many African communities, healthcare professionals work every day under difficult conditions.
            </p>
            <p className="font-medium text-gray-800">
              A dedicated healthcare worker may have the knowledge and compassion to save a life—but lack the basic equipment, supplies, or resources needed to provide effective care.
            </p>
          </div>
        </motion.div>

        {/* Shortages Grid */}
        <div className="mb-16">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-2.5 h-6 bg-red-600 rounded-full" />
              Clinics may face shortages of:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {shortages.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center gap-3.5 hover:border-red-300 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    ✕
                  </div>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Response Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              Our Response
            </div>

            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              We connect resources to need.
            </h3>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              Through donations, partnerships, logistics, community relationships, and humanitarian initiatives, Connect with Africa helps place essential resources directly into the hands of frontline healthcare providers.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/programs">
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base">
                  <span>Explore Our Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/get-involved">
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all text-sm sm:text-base">
                  <span>Get Involved</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TheChallengeSection;
