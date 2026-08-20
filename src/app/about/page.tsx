"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Heart,
  Target,
  Eye,
  Shield,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Globe2,
  Layers,
  Award,
} from "lucide-react";
import AboutHero from "@/assets/about-hero.jpg";
import ClinicInside from "@/assets/inside-clinic.jpeg";
import ClinicExterior from "@/assets/gbazgo-clinic.jpeg";

const approaches = [
  {
    step: "01",
    title: "Listen",
    description: "We begin by listening to communities and understanding their needs.",
    color: "emerald",
  },
  {
    step: "02",
    title: "Connect",
    description: "We then connect those needs with individuals and organizations capable of providing resources.",
    color: "teal",
  },
  {
    step: "03",
    title: "Deliver",
    description: "We work with local partners to facilitate responsible delivery and distribution.",
    color: "blue",
  },
  {
    step: "04",
    title: "Empower",
    description: "Most importantly, we seek to create lasting impact rather than temporary relief.",
    color: "indigo",
  },
];

const coreValues = [
  {
    title: "Compassion",
    description: "We put people at the center of everything we do.",
    icon: Heart,
  },
  {
    title: "Dignity",
    description: "Every person deserves access to healthcare and humanitarian assistance with dignity and respect.",
    icon: Award,
  },
  {
    title: "Partnership",
    description: "We believe lasting change happens when communities, donors, organizations, and institutions work together.",
    icon: Users,
  },
  {
    title: "Accountability",
    description: "We are committed to responsible stewardship of donated resources.",
    icon: Shield,
  },
  {
    title: "Transparency",
    description: "We strive to communicate openly about our programs, partnerships, activities, and impact.",
    icon: Eye,
  },
  {
    title: "Sustainability",
    description: "We seek solutions that strengthen communities beyond one-time donations.",
    icon: Layers,
  },
  {
    title: "Service",
    description: "Our work is ultimately about serving people.",
    icon: CheckCircle2,
  },
];

export default function About() {
  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-green-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={AboutHero}
            alt="Connect with Africa humanitarian volunteers and African healthcare team collaborating at community clinic"
            fill
            className="object-cover object-center opacity-85 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/25 border border-green-400/40 text-green-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md">
            <Globe2 className="w-4 h-4" />
            ABOUT US
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Bridging Global Generosity With Local Needs
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Connecting donors, healthcare institutions, and communities to equip frontline workers and save lives across Africa with dignity.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE WITH IMAGES ================= */}
      <section className="py-20 md:py-28 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Who We Are
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Generosity Should Not Stop at Borders
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 text-lg sm:text-xl">
                  Connect with Africa is a humanitarian initiative dedicated to bridging global generosity with local needs across African communities.
                </p>
                <p>
                  We believe that generosity should not stop at borders. Every year, individuals, healthcare organizations, businesses, hospitals, nonprofits, and communities have resources that can make a difference somewhere else.
                </p>
                <p>
                  At the same time, communities across Africa face healthcare challenges that cannot be solved by goodwill alone. Connect with Africa exists to help bridge that gap.
                </p>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 font-medium">
                  We identify needs, build partnerships, coordinate resources, support logistics, and connect donors with trusted community and healthcare partners.
                </div>
              </div>
            </motion.div>

            {/* Visual Images of Frontline Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 grid grid-cols-1 gap-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-64">
                <Image
                  src={ClinicInside}
                  alt="Inside primary healthcare clinic ward"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                  Primary Healthcare Center Clinic Ward
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-64">
                <Image
                  src={ClinicExterior}
                  alt="Gbazgo Primary Healthcare Center exterior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold">
                  Gbazgo Primary Healthcare Center Facility
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
              Our Approach
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Listen. Connect. Deliver. Empower.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              A structured, community-first framework built for sustainable and dignified humanitarian assistance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approaches.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 shadow-lg hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-emerald-400/40 block mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VISION & OUR MISSION ================= */}
      <section className="py-20 md:py-28 bg-white text-gray-900" id="mission">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 grid md:grid-cols-2 gap-10 items-stretch">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Eye className="w-4 h-4" />
                OUR VISION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                A Future Where Every Community Has the Resources to Care.
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                We envision African communities where healthcare workers have the tools they need, clinics have access to essential resources, and families can receive care with dignity regardless of where they live.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                <Target className="w-4 h-4" />
                OUR MISSION
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Equip the Frontlines. Empower Communities. Transform Lives.
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                From primary healthcare centers in Nigeria to rural communities with limited access to essential healthcare, our mission is simple: <strong>Equip those who serve on the frontlines so they can save lives with dignity.</strong>
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We believe that communities should not have to wait for a crisis before receiving basic medical resources. Connect with Africa works to move essential supplies, resources, knowledge, and partnerships to communities where they are urgently needed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OUR CORE VALUES ================= */}
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
              <Sparkles className="w-4 h-4" />
              OUR CORE VALUES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              The Principles That Guide Our Work
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coreValues.map((val, index) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all ${
                  index === 6 ? "sm:col-span-2 lg:col-span-3 xl:col-span-1" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Join Us in Connecting Resources With Need
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you want to donate funds, provide medical supplies, volunteer, or partner with our programs, your support makes life-saving care possible.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-wrap">
            <Link href="/donate">
              <Button className="bg-white hover:bg-gray-100 text-emerald-900 font-bold px-8 py-3.5 rounded-xl shadow-lg text-base">
                DONATE NOW
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-emerald-950/30 border-white/30 text-white hover:bg-emerald-950/50 px-8 py-3.5 rounded-xl text-base">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
