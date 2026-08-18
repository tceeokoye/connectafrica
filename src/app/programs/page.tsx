"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Package,
  MapPin,
  Stethoscope,
  Users,
  Truck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/hospitalSuply.jpeg";

const programs = [
  {
    icon: Package,
    title: "Medical Supplies & Equipment Program",
    description: "Connecting healthcare facilities with donated medical resources.",
    details: "We source, inventory, prepare, and deliver essential diagnostic tools, hospital beds, PPE, maternity kits, and consumables to clinics facing severe shortages.",
    color: "emerald",
  },
  {
    icon: MapPin,
    title: "Rural Healthcare Support Program",
    description: "Supporting healthcare access in underserved and rural communities.",
    details: "Bridging the critical geographical gap by delivering essential healthcare capabilities directly to remote primary healthcare centers and villages.",
    color: "teal",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Worker Support Program",
    description: "Helping frontline healthcare workers access tools and resources.",
    details: "Equipping doctors, nurses, and midwives with the instruments, protective equipment, and dignity needed to serve patients safely and effectively.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Community Health Initiative",
    description: "Supporting community-based health awareness, prevention, and education.",
    details: "Extending health awareness beyond clinic walls through localized prevention programs, maternal-child wellness education, and community engagement.",
    color: "indigo",
  },
  {
    icon: Truck,
    title: "Humanitarian Logistics Program",
    description: "Helping move donated resources from donors to communities in need.",
    details: "Managing end-to-end international shipping, customs coordination, warehousing, and secure last-mile distribution to ensure supplies reach verified partners.",
    color: "amber",
  },
  {
    icon: HeartHandshake,
    title: "Partnership & Development Program",
    description: "Building relationships with organizations interested in long-term healthcare and community development.",
    details: "Collaborating with hospitals, corporations, foundations, diaspora groups, and international development agencies to build sustainable healthcare systems.",
    color: "emerald",
  },
];

export default function ProgramsPage() {
  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH VIVID BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Medical Supplies for Africa"
            fill
            className="object-cover object-center opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-emerald-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            PROGRAMS
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Programs
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Connecting resources with communities where they are needed most through targeted, transparent, and sustainable healthcare initiatives.
          </p>
        </div>
      </section>

      {/* ================= PROGRAMS GRID ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, index) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <prog.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {prog.title}
                  </h3>
                  <p className="text-emerald-800 font-semibold text-base leading-snug">
                    {prog.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed pt-2 border-t border-gray-100">
                    {prog.details}
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <Link href="/get-involved">
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 font-semibold text-sm">
                      Support This Program
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED CALL TO ACTION ================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Help Us Equip A Frontline Clinic Today
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every dollar and piece of medical equipment donated enables our programs to reach more healthcare workers and save more lives.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Link href="/donate">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg text-base flex items-center gap-2">
                <span>DONATE NOW</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-slate-700 text-gray-200 hover:text-white hover:bg-slate-800 px-8 py-3.5 rounded-xl text-base">
                Inquire About Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
