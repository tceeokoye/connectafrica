"use client";

import { motion } from "framer-motion";
import { Target, HeartHandshake, Shield, Sparkles } from "lucide-react";

export const MissionSection = () => {
  return (
    <section id="mission" className="py-20 md:py-28 bg-gradient-to-b from-green-900 via-green-950 to-emerald-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            <Target className="w-4 h-4" />
            Our Mission
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Equip the Frontlines. Empower Communities. Transform Lives.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Mission Statement Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center space-y-6"
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              From primary healthcare centers in Nigeria to rural communities with limited access to essential healthcare, our mission is simple:
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-6 py-2">
              <p className="text-xl sm:text-2xl font-bold text-emerald-300 leading-snug">
                “Equip those who serve on the frontlines so they can save lives with dignity.”
              </p>
            </blockquote>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              We believe that communities should not have to wait for a crisis before receiving basic medical resources.
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Connect with Africa works to move essential supplies, resources, knowledge, and partnerships from places where they are available to communities where they are urgently needed.
            </p>
          </motion.div>

          {/* Pillars List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex gap-4 items-start hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Equip the Frontlines</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Supplying healthcare workers with the exact tools and consumables needed to deliver safe, effective patient care.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex gap-4 items-start hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 text-teal-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Empower Communities</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Working with local leadership, clinics, and organizations to strengthen long-term community health capacity.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex gap-4 items-start hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Transform Lives</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Turning generosity into measurable, dignified, and lasting life-saving impact across Africa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
