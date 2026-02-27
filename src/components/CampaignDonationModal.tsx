"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CampaignDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    _id: string;
    title: string;
    amount: number;
    donatedAmount: number;
  };
}

const AMOUNT_PRESETS = [
  { amount: 25, label: "$25" },
  { amount: 50, label: "$50" },
  { amount: 100, label: "$100" },
  { amount: 250, label: "$250" },
  { amount: 500, label: "$500" },
];

export default function CampaignDonationModal({
  isOpen,
  onClose,
  campaign,
}: CampaignDonationModalProps) {
  const [step, setStep] = useState<"amount" | "details">("amount");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Check if campaign has ended
  const hasEnded = campaign && campaign._id && (() => {
    // This is a simple check - the API will also validate
    return false; // Campaign validity is checked on API side
  })();

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setError(null);
  };

  const handleProceedToDetails = () => {
    if (!finalAmount || finalAmount <= 0) {
      setError("Please select or enter a valid amount");
      return;
    }
    if (finalAmount < 10) {
      setError("Minimum donation amount is $10");
      return;
    }
    setError(null);
    setStep("details");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Valid email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (formData.phone.length < 10) {
      setError("Phone number must be at least 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        campaignId: String(campaign._id),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        amount: finalAmount,
      };


      const response = await fetch("/api/v1/user/campaigns/donate/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("📥 Response from API:", {
        status: response.status,
        data,
      });

      if (!response.ok) {
        setError(data.message || `Error: ${response.status} ${response.statusText}`);
        return;
      }

      if (data.success && data.checkoutUrl) {
        // Store reference for verification
        localStorage.setItem(
          "donation_reference",
          JSON.stringify({
            reference: data.reference,
            campaignId: String(campaign._id),
            timestamp: Date.now(),
          })
        );

        console.log("✅ Donation initiated, redirecting to checkout");
        // Redirect to PayPal
        window.location.href = data.checkoutUrl;
      } else {
        setError(data.message || "Failed to process donation. Please try again.");
      }
    } catch (err: any) {
      console.error("❌ Donation error:", err);
      setError(err?.message || "Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4 flex items-center justify-between z-10">
            <h2 className="font-bold text-lg">Support Campaign</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Campaign Info */}
            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-emerald-900 mb-2">{campaign.title}</h3>
              <div className="text-sm text-emerald-700">
                <p>
                  Target: ${(campaign.amount || 0).toLocaleString()}
                </p>
                <p>Raised: ${(campaign.donatedAmount || 0).toLocaleString()}</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex gap-3"
              >
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Step 1: Amount Selection */}
            {step === "amount" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Select Donation Amount
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {AMOUNT_PRESETS.map(({ amount, label }) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`p-3 rounded-lg font-semibold transition-all ${
                          selectedAmount === amount
                            ? "bg-emerald-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customAmount" className="text-sm font-semibold text-gray-700 mb-2 block">
                    or Enter Custom Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-600 font-semibold">$</span>
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="pl-7"
                      min="10"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleProceedToDetails}
                  disabled={!finalAmount || finalAmount <= 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  Proceed to Details
                </Button>
              </motion.div>
            )}

            {/* Step 2: Donor Details */}
            {step === "details" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700 font-semibold">
                  Donation Amount: ${finalAmount?.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+234 8000 0000 00"
                    value={formData.phone}
                    onChange={handleFormChange}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    {loading ? "Processing..." : "Complete Donation"}
                  </Button>
                  <Button
                    onClick={() => {
                      setStep("amount");
                      setError(null);
                    }}
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                  >
                    Back
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
