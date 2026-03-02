"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Heart, Shield, Package, Baby, Building, Check } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import GeneralDonationModal from "@/components/GeneralDonationModal";

const donationAmounts = [
  {
    amount: 25,
    title: "Protect a Ward",
    description: "Provides gloves and basic PPE for frontline nurses.",
    icon: Shield,
  },
  {
    amount: 50,
    title: "Equip a Delivery Room",
    description: "Helps supply sterile items for safe childbirth.",
    icon: Baby,
  },
  {
    amount: 100,
    title: "Supply a Clinic",
    description:
      "Contributes to wound care, infection-control materials, and diagnostic tools.",
    icon: Package,
  },
  {
    amount: 250,
    title: "Support a Container",
    description:
      "Helps cover shipping, logistics, and bulk purchase of supplies.",
    icon: Building,
  },
];

export default function DonatePage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Modal for one-time/monthly donation
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selected donation amounts
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState<typeof donationAmounts[0] | null>(null);

  const [donationType, setDonationType] = useState<"one-time" | "monthly">(
    "one-time"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "where-most-needed",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in your name and email",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(customAmount || String(selectedAmount || 0));
    if (amount <= 0) {
      toast({
        title: "Error",
        description: "Please select or enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (amount < 10) {
      toast({
        title: "Error",
        description: "Minimum donation amount is $10",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/v1/user/donations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          amount,
          donationType,
          designation: formData.designation,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl && data.reference) {
        localStorage.setItem(
          "donation_reference",
          JSON.stringify({
            reference: data.reference,
            timestamp: Date.now(),
            amount,
            email: formData.email,
          })
        );

        toast({
          title: "Redirecting to payment...",
          description: `Processing your ${donationType} donation of $${amount.toLocaleString()}`,
        });

        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to process donation",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Failed to process donation",
        variant: "destructive",
      });
      console.error("Donation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentAmount = Number(customAmount || selectedAmount || 0);

  return (
    <Layout className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=60"
            alt="Connect with Africa hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-emerald-900/50 to-black/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Connecting Compassion to Communities in Need
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-200 mb-8"
          >
            Strengthening African clinics, schools, and communities with life-saving supplies, sustainable partnerships, and hope in action.
          </motion.p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Donate Now
            </Button>
            <Button
              className="bg-white text-emerald-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold"
            >
              Medical Container Campaign
            </Button>
          </div>
        </div>
      </section>

      {/* Why Your Gift Matters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Every Gift Becomes a Lifeline
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Your contribution directly supports the shipment of medical supplies and critical resources to clinics that are currently operating with almost nothing. Together, we can give nurses, midwives, and doctors the tools they need to serve their communities safely and effectively.
          </p>
        </div>
      </section>

      {/* Choose Your Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Impact
            </h2>
            <p className="text-gray-600 text-lg">
              Select a preset donation amount or enter a custom gift. See exactly how your support helps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            {donationAmounts.map((item, index) => (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => {
                  setSelectedAmount(item.amount);
                  setCustomAmount("");
                  setSelectedCard(item);
                }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedAmount === item.amount && !customAmount
                    ? "border-emerald-600 bg-emerald-50 shadow-lg"
                    : "border-gray-200 hover:border-emerald-400 bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  {selectedAmount === item.amount && !customAmount && (
                    <Check className="w-6 h-6 text-emerald-600" />
                  )}
                </div>
                <div className="font-display text-3xl font-bold text-gray-900 mb-2">
                  ${item.amount}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-12"
          >
            <Label htmlFor="custom-amount" className="text-gray-700 font-semibold mb-3 block">
              Or enter a custom amount
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter your amount"
                value={customAmount}
                onChange={(e: any) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                  setSelectedCard(null);
                }}
                className="pl-10 py-3 text-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </motion.div>

          {/* One-Time / Monthly */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-center gap-4 mb-12"
          >
            <Button
              variant={donationType === "one-time" ? "default" : "outline"}
              onClick={() => {
                if (!selectedCard && !customAmount) {
                  toast({
                    title: "Select an amount",
                    description: "Please select a donation card or enter an amount",
                    variant: "destructive",
                  });
                  return;
                }
                setDonationType("one-time");
                setIsModalOpen(true);
              }}
              className={`px-8 py-3 font-semibold ${
                donationType === "one-time"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              One-Time Gift
            </Button>
            <Button
              variant={donationType === "monthly" ? "default" : "outline"}
              onClick={() => {
                if (!selectedCard && !customAmount) {
                  toast({
                    title: "Select an amount",
                    description: "Please select a donation card or enter an amount",
                    variant: "destructive",
                  });
                  return;
                }
                setDonationType("monthly");
                setIsModalOpen(true);
              }}
              className={`px-8 py-3 font-semibold ${
                donationType === "monthly"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              Monthly Partner
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200"
          >
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-8">
              Complete Your Donation
            </h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                  Name / Organization
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name or organization"
                  required
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your phone number"
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="designation" className="text-gray-700 font-semibold mb-2 block">
                  Designation
                </Label>
                <select
                  id="designation"
                  value={formData.designation}
                  onChange={(e: any) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                >
                  <option value="where-most-needed">Where Our Work Needs It Most</option>
                  <option value="medical-container">Medical Container Campaign</option>
                </select>
              </div>

              <motion.div whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 text-lg mt-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline mr-2"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2 hidden md:inline" />
                      Complete Donation – ${currentAmount.toLocaleString()}
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-gray-600 text-center">
                Thank you for standing with frontline healthcare workers and the communities they serve. Your generosity travels farther than you can imagine.
              </p>
            </div>
          </motion.form>
        </div>
      </section> */}

      {/* General Donation Modal */}
      <GeneralDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={currentAmount}
        donationType={donationType}
        card={selectedCard}
      />
    </Layout>
  );
}