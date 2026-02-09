"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Heart, Target, Eye, Users, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import AboutHero from "@/assets/image1.jpeg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Founder from "@/assets/Founder.jpeg";

const values = [
  {
    icon: Heart,
    title: "Dignity",
    description:
      "We partner with communities respecting their agency, knowledge, and cultural context.",
  },
  {
    icon: CheckCircle2,
    title: "Transparency",
    description:
      "We provide detailed reporting on how every dollar is used and what results are achieved.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "We measure and report on measurable outcomes that improve lives.",
  },
  {
    icon: Users,
    title: "Accountability",
    description:
      "We're accountable to our donors, partners, and the communities we serve.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Foundation",
    description:
      "Established with a vision to bridge global generosity with healthcare needs in Africa.",
    highlights: ["Organizational launch", "Mission clarification", "Founder vision"]
  },
  {
    year: "2021",
    title: "First Success",
    description:
      "Shipped first container of medical supplies to healthcare facilities in Nigeria.",
    highlights: ["First shipment", "Initial partnerships", "Proof of concept"]
  },
  {
    year: "2022",
    title: "Expansion",
    description:
      "Established partnerships with 10+ primary healthcare centers across Northern Nigeria.",
    highlights: ["Network growth", "Community partnerships", "Reach expansion"]
  },
  {
    year: "2023",
    title: "Scale & Innovation",
    description:
      "Launched the Medical Container Campaign with enhanced tracking and transparency.",
    highlights: ["Scaled operations", "Better transparency", "Growth trajectory"]
  },
  {
    year: "2024",
    title: "Going Global",
    description:
      "Expanded operations to 12 countries and reached 50,000+ beneficiaries.",
    highlights: ["International reach", "Massive impact", "Sustainable model"]
  },
];

export default function About() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={AboutHero.src || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600"} alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-emerald-900/60 to-black/80" />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold mb-6"
            >
              Our Story
            </motion.span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bridging Global Generosity with Local Needs
            </h1>
            <p className="text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed">
              Since 2020, we've partnered with communities across Africa to deliver essential resources 
              where they're needed most. Our work is guided by transparency, accountability, and a deep 
              commitment to the people we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl border-2 border-emerald-500 p-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Equip frontline healthcare workers across Africa with essential supplies and support so they can provide quality care with dignity and save lives in their communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl border-2 border-blue-500 p-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A world where every healthcare facility and community in Africa has equitable access to quality care, powered by sustainable partnerships and resourcing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Values That Guide Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These principles shape every decision we make and how we interact with partners and communities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Growth & Impact Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From startup to international NGO, see how we've grown and scaled our impact.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative mb-16"
              >
                <div className="flex gap-8">
                  {/* Timeline node */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white text-2xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {item.year}
                    </motion.div>
                    {index < timeline.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-emerald-400 to-emerald-200 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 hover:border-emerald-300 transition-colors">
                      <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {item.highlights.map((highlight, i) => (
                          <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              Leadership
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founder
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Driven by passion and grounded in purpose, our leadership brings diverse expertise to our mission.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-6 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
                  <Image
                    src={Founder}
                    alt="Cajetan Onu - Founder & Executive Director"
                    width={500}
                    height={600}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Cajetan Onu, JD
                </h3>
                <p className="text-emerald-600 font-bold text-lg mb-6">Founder & Executive Director</p>
                
                <div className="space-y-6 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Cajetan founded Connect with Africa with a mission to bridge the gap between global generosity and local healthcare needs. His vision came from witnessing healthcare challenges in African communities and the power of coordinated global support.
                  </p>
                  
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Background & Expertise</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                        Juris Doctor (JD) with expertise in governance and compliance
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                        Experienced in developing nonprofit operations and scaling impact
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                        Passionate advocate for healthcare equity in underserved communities
                      </li>
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg rounded-lg font-semibold inline-flex items-center gap-2">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Join Our Movement for Healthcare Equity
            </h2>
            <p className="text-emerald-50 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Whether you're a donor, partner, volunteer, or advocate, there are many ways to contribute to our mission. 
              Together, we can make a lasting difference in healthcare across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate">
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-bold rounded-lg inline-flex items-center gap-2 hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-white  text-emerald-600 hover:bg-white/10 px-8 py-3 text-lg font-bold rounded-lg inline-flex items-center gap-2">
                  Become a Partner
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
