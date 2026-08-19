"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Building2,
  Briefcase,
  Award,
  Globe,
  Users,
  Handshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/gbazgo-clinic.jpeg";

const partnerCategories = [
  {
    icon: Building2,
    title: "Healthcare Organizations",
    description: "Hospitals, clinics, healthcare systems, medical professionals.",
    details: "Partner with us on surplus equipment distribution, clinical advisory, and medical supply drives.",
    color: "emerald",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    description: "Companies interested in corporate social responsibility and humanitarian initiatives.",
    details: "Corporate sponsorship, grant funding, employee matching programs, and supply chain collaboration.",
    color: "teal",
  },
  {
    icon: Award,
    title: "Foundations",
    description: "Organizations supporting healthcare, humanitarian aid, and community development.",
    details: "Strategic funding partnerships targeted at expanding frontline primary healthcare capacity.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Nonprofits",
    description: "Organizations seeking collaborative opportunities across Africa.",
    details: "Coordinated humanitarian response, shared logistics, and community development initiatives.",
    color: "indigo",
  },
  {
    icon: Users,
    title: "Diaspora Communities",
    description: "African diaspora organizations and community groups.",
    details: "Engaging diaspora networks to sponsor clinics, coordinate containers, and channel resources back home.",
    color: "amber",
  },
];

export default function PartnersPage() {
  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-green-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Humanitarian partnerships"
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
            PARTNERS
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Stronger Together
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            No organization can transform communities alone. Connect with Africa welcomes partnerships with organizations and individuals committed to improving healthcare access and strengthening African communities.
          </p>
        </div>
      </section>

      {/* ================= PARTNERSHIP CATEGORIES ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
              Collaborative Impact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              We Welcome Partnerships With
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerCategories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`bg-white border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {cat.title}
                  </h3>
                  <p className="text-emerald-900 font-semibold text-base leading-snug">
                    {cat.description}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed pt-2 border-t border-gray-100">
                    {cat.details}
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <Link href={`/contact?type=partner&partnerType=${encodeURIComponent(cat.title)}`}>
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 font-semibold text-sm">
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLOSING BANNER ================= */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Handshake className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Let&apos;s Connect Resources With Need.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to explore how your organization can collaborate with Connect with Africa to transform frontline healthcare?
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Link href="/contact?type=partner">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-base flex items-center gap-2">
                <span>START A PARTNERSHIP</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
