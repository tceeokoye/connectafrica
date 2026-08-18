"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Stethoscope,
  Truck,
  Building2,
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import GeneralDonationModal from "@/components/GeneralDonationModal";
import heroBg from "@/assets/hospitalSuply.jpeg";

const donationAmounts = [
  {
    amount: 100,
    title: "Equip Frontline Workers",
    description: "Can help equip frontline healthcare workers.",
    icon: Stethoscope,
  },
  {
    amount: 250,
    title: "Supply Efforts",
    description: "Can contribute toward larger humanitarian supply efforts.",
    icon: Truck,
  },
  {
    amount: 500,
    title: "Medical Equipment Support",
    description: "Can help support medical equipment and community healthcare initiatives.",
    icon: Building2,
  },
];

const donationOptions = [
  "One-Time Donation",
  "Monthly Donation",
  "Corporate Donation",
  "Medical Equipment Donation",
  "In-Kind Donation",
  "Sponsorship",
  "Fundraising Campaign",
];

export default function DonatePage() {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedType, setSelectedType] = useState<string>("One-Time Donation");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentAmount = Number(customAmount || selectedAmount || 100);

  const handleDonateNow = () => {
    if (currentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a donation amount.",
        variant: "destructive",
      });
      return;
    }

    if (
      selectedType === "Medical Equipment Donation" ||
      selectedType === "In-Kind Donation" ||
      selectedType === "Corporate Donation" ||
      selectedType === "Sponsorship"
    ) {
      window.location.href = `/contact?type=supplies&donationType=${encodeURIComponent(selectedType)}`;
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Equipping clinics with life-saving equipment"
            fill
            className="object-cover object-center opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-emerald-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            DONATE PAGE
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Generosity Can Help Save Lives
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            A donation to Connect with Africa helps us connect resources with communities where they are needed most.
          </p>
        </div>
      </section>

      {/* ================= MAIN DONATION SECTION ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4">
                GIVE TODAY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Select Your Level of Support
              </h2>
            </div>

            {/* Giving Tiers */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {donationAmounts.map((item) => {
                const isSelected = selectedAmount === item.amount && !customAmount;
                return (
                  <motion.div
                    key={item.amount}
                    whileHover={{ y: -4 }}
                    onClick={() => {
                      setSelectedAmount(item.amount);
                      setCustomAmount("");
                    }}
                    className={`p-6 sm:p-8 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20"
                        : "border-gray-200 hover:border-emerald-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <item.icon className="w-6 h-6" />
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        ${item.amount}
                        {item.amount === 500 ? "+" : ""}
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Custom Donation */}
            <div className="max-w-md mx-auto mb-10">
              <Label htmlFor="custom-amount" className="text-sm font-bold text-gray-700 mb-2 block">
                Custom Donation:
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
                  $
                </span>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="pl-9 py-6 text-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                />
              </div>
            </div>

            {/* Donation Options / Types */}
            <div className="mb-10">
              <Label className="text-sm font-bold text-gray-700 mb-3 block text-center">
                Select Giving Category:
              </Label>
              <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
                {donationOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedType(opt)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedType === opt
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-slate-100 text-gray-700 hover:bg-slate-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspirational Message & CTA */}
            <div className="border-t border-gray-200 pt-8 text-center space-y-6">
              <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-gray-800 text-base sm:text-lg font-medium leading-relaxed italic">
                  “Your generosity can travel farther than you imagine. From a donor&apos;s hands to a healthcare worker&apos;s hands—and ultimately to a patient who needs care.”
                </p>
              </div>

              <div>
                <Button
                  onClick={handleDonateNow}
                  className="w-full max-w-md mx-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <span>DONATE NOW – ${currentAmount.toLocaleString()}</span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tax-deductible 501(c)(3) contributions | Secure 256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Donation Modal */}
      <GeneralDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={currentAmount}
        donationType={selectedType === "Monthly Donation" ? "monthly" : "one-time"}
      />
    </Layout>
  );
}