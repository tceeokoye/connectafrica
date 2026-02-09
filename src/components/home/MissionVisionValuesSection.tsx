"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";

const missionVisionValues = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Bridge the gap between global generosity and local needs by delivering essential resources and support to underserved communities across Africa with integrity, transparency, and cultural sensitivity.",
    color: "emerald",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where every African community has equitable access to quality healthcare, education, and economic opportunities, powered by meaningful global partnerships and local leadership.",
    color: "blue",
  },
];

const coreValues = [
  { icon: Heart, label: "Dignity", description: "Respect for local agency and community knowledge" },
  { icon: CheckCircle2, label: "Transparency", description: "Full accountability in all operations and impact reporting" },
  { icon: Target, label: "Impact", description: "Measurable, sustainable change in communities we serve" },
  { icon: Eye, label: "Partnership", description: "Collaborative approach with local leaders and stakeholders" },
];

export const MissionVisionValuesSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -ml-32 -mb-32" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Who We Are & What We Stand For
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our mission, vision, and core values guide every decision we make and every project we undertake.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {missionVisionValues.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow p-10"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-${item.color}-100`}>
                <item.icon className={`w-8 h-8 text-${item.color}-600`} />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-white"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-12 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h4 className="font-semibold text-lg mb-3">{value.label}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionValuesSection;
