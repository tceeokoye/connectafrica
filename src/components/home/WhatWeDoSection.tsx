"use client";

import { motion } from "framer-motion";
import {
  Package,
  Building2,
  Users2,
  Stethoscope,
  Globe2,
  CheckCircle2,
} from "lucide-react";

const medicalExamples = [
  "Medical examination equipment",
  "Hospital beds",
  "Wheelchairs",
  "Diagnostic equipment",
  "PPE",
  "Maternity supplies",
  "Medical consumables",
  "Patient-care equipment",
  "Laboratory supplies",
  "Emergency medical supplies",
];

const partnersList = [
  "Hospitals",
  "Clinics",
  "Healthcare professionals",
  "Community leaders",
  "Nonprofit organizations",
  "Businesses",
  "Foundations",
  "Government agencies",
  "Diaspora organizations",
  "International development partners",
];

export const WhatWeDoSection = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50 text-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
            WHAT WE DO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Work
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Connecting global generosity with frontline African clinics and communities through structured, sustainable initiatives.
          </p>
        </motion.div>

        {/* 5 Work Areas */}
        <div className="space-y-10">
          {/* 1. Medical Supplies & Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Medical Supplies & Equipment
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We collect, coordinate, prepare, and distribute donated medical supplies and equipment to healthcare facilities and communities where they are needed most.
                </p>
              </div>

              <div className="lg:col-span-7 bg-slate-50 border border-slate-200/80 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                  Examples may include:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {medicalExamples.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Healthcare Facility Support & 3. Community Health */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Healthcare Facility Support */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Healthcare Facility Support
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  We partner with healthcare facilities and community organizations to identify critical needs and help connect them with available resources.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100">
                <p className="text-sm text-gray-700 font-semibold mb-1">
                  Our goal is not simply to deliver supplies.
                </p>
                <p className="text-sm text-emerald-900 font-bold">
                  Our goal is to help healthcare workers serve more patients, more effectively and with greater dignity.
                </p>
              </div>
            </motion.div>

            {/* Community Health */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Users2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Community Health
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Healthcare extends beyond hospital walls. We support initiatives that improve access to healthcare information, resources, prevention, and community-based services.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  Our community-focused approach recognizes the importance of local leadership and community participation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* 4. Healthcare Worker Support */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                  <Stethoscope className="w-4 h-4" />
                  Frontline Focus
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Healthcare Worker Support
                </h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Frontline healthcare workers are the heart of every healthcare system. We seek to support those workers by helping provide the tools, equipment, and resources they need to perform their jobs.
                </p>
                <p className="text-emerald-400 font-bold text-lg">
                  When we strengthen healthcare workers, we strengthen communities.
                </p>
              </div>

              <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <p className="text-sm text-white font-medium">
                  Empowering doctors, nurses, midwives, and community health officers to save lives safely.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 5. Humanitarian Partnerships */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Globe2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Humanitarian Partnerships
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Connecting global capacity with local community needs
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                  We collaborate with:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {partnersList.map((partner) => (
                    <div
                      key={partner}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center text-xs sm:text-sm font-semibold text-gray-800"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-emerald-800 font-medium text-sm sm:text-base">
                  Together, we create pathways for resources and expertise to reach communities where they can make a meaningful difference.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
