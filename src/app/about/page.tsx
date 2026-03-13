"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Heart,
  Target,
  Eye,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import AboutHero from "@/assets/gbazgo-clinic.jpeg"; // Replace with outside clinic photo
import CampaignImage from "@/assets/inside-clinic.jpeg"; // Replace with treatment room photo
import Image from "next/image";
import Founder from "@/assets/Founder.jpeg";
import CampaignSection from "@/components/home/CampaignSection";

const focusAreas = [
  {
    icon: Target,
    title: "Healthcare Support",
    description:
      "Delivering medical supplies, basic equipment, and protective gear to clinics and health centers that are critically under-resourced.",
  },
  {
    icon: Users,
    title: "Community Partnerships",
    description:
      "Working directly with local leaders, nurses, and administrators to ensure supplies reach the people who need them most.",
  },
  {
    icon: Eye,
    title: "Education & Training (Future Focus)",
    description:
      "Supporting capacity building, health education, and partnerships that strengthen systems beyond a single shipment.",
  },
  {
    icon: Globe,
    title: "Diaspora & Global Engagement",
    description:
      "Connecting individuals, companies, and institutions around the world to meaningful, trackable projects in Africa.",
  },
];

export default function About() {
  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={AboutHero}
            alt="Gbazgo Primary Healthcare Center"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-emerald-900/60 to-black/80" />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connecting Compassion to Communities in Need
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Strengthening African clinics, schools, and communities with
            life-saving supplies, sustainable partnerships, and hope in action.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            About Connect with Africa
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Connect with Africa is a humanitarian initiative dedicated to
            bridging global generosity with local needs across African
            communities. We work alongside clinics, community leaders, and
            development partners to deliver medical supplies, support healthcare
            workers, and create pathways for long-term change.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed text-center mt-6">
            From primary healthcare centers in Nigeria to rural communities with
            limited access to care, our mission is simple:{" "}
            <strong>
              equip those who serve on the frontlines so they can save lives
              with dignity.
            </strong>
          </p>
        </div>
      </section>

      {/* ================= FOCUS AREAS ================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
            Our Focus Areas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {focusAreas.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MEDICAL CONTAINER CAMPAIGN ================= */}
      <CampaignSection />

      {/* ================= IMPACT STORY ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            “Now We Can Treat Our Patients with Dignity”
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Last year, Connect with Africa coordinated the delivery of a
            container of medical supplies to Northern Nigeria. As the nurses
            unpacked the boxes, many of them wept.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            “Now we can treat our patients with dignity,” they said.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            What seemed like simple items — gloves, dressings, basic tools —
            became the difference between turning patients away and providing
            safe, respectful care.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            Your support makes stories like this possible.
          </p>
        </div>
      </section>

      {/* ================= FOUNDER ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full sm:w-[300px] md:w-[320px] lg:w-[400px] ">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 via-gold/20 to-accent/20 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={Founder}
                alt="Cajetan Onu - Founder"
                width={500}
                height={420}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founder
            </h2>
            <h3 className="text-emerald-600 font-bold text-xl mb-6">
              Cajetan Onu, JD
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Cajetan Onu, JD, is the Founder and Executive Director of Connect
              with Africa. With a background in law, compliance, and community
              development, he has dedicated his work to building bridges between
              global partners and underserved African communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-6">
              His recent visits to primary healthcare centers in Nigeria inform
              and guide every aspect of this mission. Seeing firsthand the
              challenges faced by nurses and midwives continues to shape Connect
              with Africa’s focus on dignity, accountability, and long-term
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Join Us in Filling Two Containers of Hope
          </h2>
          <p className="text-emerald-50 text-lg mb-10 leading-relaxed">
            Whether you are an individual donor, corporate partner, healthcare
            institution, or advocate, your support helps equip frontline
            healthcare workers with the tools they need to save lives safely and
            effectively. Together, we can transform under-resourced clinics into
            places of dignity, safety, and hope.
          </p>
          <Link href="/donate">
            <Button className="bg-white h-fit text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-bold rounded-lg">
                <p className="flex flex-col">
                    <span>Donate Now</span>
                    
                    <span className="text-emerald-600/50">why your gift matters</span>
                </p>
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
