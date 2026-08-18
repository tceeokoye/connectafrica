"use client";

import { motion } from "framer-motion";
import { Bed, Activity, ShieldPlus, Baby, Users2, Sparkles } from "lucide-react";
import Link from "next/link";

const impactStories = [
  {
    icon: Bed,
    text: "A hospital bed can provide a place for a patient to recover.",
    color: "emerald",
  },
  {
    icon: Activity,
    text: "A diagnostic device can help a healthcare professional identify a condition.",
    color: "teal",
  },
  {
    icon: ShieldPlus,
    text: "Medical supplies can help a clinic serve patients safely.",
    color: "blue",
  },
  {
    icon: Baby,
    text: "A maternity kit can support a mother and newborn.",
    color: "rose",
  },
  {
    icon: Users2,
    text: "A partnership can create opportunities that continue long after a shipment arrives.",
    color: "amber",
  },
];

export const ImpactSection = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            OUR IMPACT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            From Donation to Community Impact
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-emerald-300">
            Every donated item represents an opportunity.
          </p>
        </motion.div>

        {/* 5 Impact Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {impactStories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 shadow-lg hover:border-emerald-500/50 hover:shadow-2xl transition-all ${
                index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7" />
              </div>
              <p className="text-gray-100 text-lg font-semibold leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Your generosity can travel farther than you imagine.
          </h3>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            From a donor&apos;s hands to a healthcare worker&apos;s hands—and ultimately to a patient who needs care.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/donate">
              <button className="px-8 py-3.5 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2">
                <span>DONATE TODAY</span>
              </button>
            </Link>
            <Link href="/gallery">
              <button className="px-8 py-3.5 bg-emerald-950/40 text-white font-semibold rounded-xl border border-white/20 hover:bg-emerald-950/60 transition-colors">
                <span>View Pictures From The Frontlines</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
