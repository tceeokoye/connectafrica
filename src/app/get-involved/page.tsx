"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Heart,
  Package,
  Building2,
  Users,
  Megaphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/aboutImage.jpeg";

const corporatePoints = [
  "Financial sponsorship",
  "Equipment donations",
  "Employee giving",
  "Matching gifts",
  "Corporate grants",
  "Logistics support",
];

const volunteerPoints = [
  "Professional skills",
  "Healthcare expertise",
  "Logistics experience",
  "Fundraising abilities",
  "Communications skills",
  "Community connections",
];

export default function GetInvolvedPage() {
  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-green-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Humanitarian impact"
            fill
            className="object-cover object-center opacity-85 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/25 border border-green-400/40 text-green-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            GET INVOLVED
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            You Can Be Part of the Solution
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            There are many ways to support Connect with Africa. Together, we can deliver essential resources directly into the hands of frontline healthcare providers.
          </p>
        </div>
      </section>

      {/* ================= 5 WAYS TO GET INVOLVED ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          {/* 1. Donate & 2. Donate Medical Supplies */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 1. Donate */}
            <motion.div
              id="donate"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Heart className="w-7 h-7 fill-emerald-600 text-emerald-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Donate
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Your financial contribution helps us operate programs and respond to humanitarian needs.
                </p>
              </div>

              <div className="pt-8">
                <Link href="/donate">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base">
                    <span>DONATE NOW</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* 2. Donate Medical Supplies */}
            <motion.div
              id="donate-supplies"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Package className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Donate Medical Supplies
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Have medical equipment or supplies available for donation? We coordinate secure collection and shipment to clinics in need.
                </p>
              </div>

              <div className="pt-8">
                <Link href="/contact?type=supplies">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base">
                    <Package className="w-4 h-4" />
                    <span>DONATE SUPPLIES</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 3. Become a Corporate Partner */}
          <motion.div
            id="corporate-partner"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Become a Corporate Partner
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Businesses can support our mission through:
                </p>

                <div className="pt-4">
                  <Link href="/contact?type=partner">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2 text-base">
                      <span>BECOME A PARTNER</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {corporatePoints.map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-800">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Volunteer & 5. Start a Fundraiser */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 4. Volunteer */}
            <motion.div
              id="volunteer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Volunteer
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Share your:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  {volunteerPoints.map((point) => (
                    <div key={point} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href="/contact?type=volunteer">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base">
                    <Users className="w-4 h-4" />
                    <span>VOLUNTEER WITH US</span>
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* 5. Start a Fundraiser */}
            <motion.div
              id="fundraise"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Megaphone className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Start a Fundraiser
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Help raise awareness and resources within your community, workplace, school, or religious group.
                </p>
              </div>

              <div className="pt-8">
                <Link href="/contact?type=fundraiser">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-base">
                    <Megaphone className="w-4 h-4" />
                    <span>START A FUNDRAISER</span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
