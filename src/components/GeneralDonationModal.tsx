"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonationCard {
  amount: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface GeneralDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  donationType: "one-time" | "monthly";
  card?: DonationCard | null;
}

export default function GeneralDonationModal({
  isOpen,
  onClose,
  amount,
  donationType,
  card,
}: GeneralDonationModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return setError("Name is required");
    if (!formData.email.includes("@")) return setError("Valid email required");
    if (amount < 10) return setError("Minimum donation is $10");

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/user/donations/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          amount,
          donationType,
          designation: card?.title || "where-most-needed",
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        localStorage.setItem(
          "donation_reference",
          JSON.stringify({
            reference: data.reference,
            timestamp: Date.now(),
          })
        );

        window.location.href = data.checkoutUrl;
      } else {
        setError(data.message || "Failed to process donation");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const CardIcon = card?.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
        >
          {/* Header */}
          <div className="bg-emerald-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <h2 className="font-bold flex items-center gap-2">
              {CardIcon && <CardIcon className="w-6 h-6 text-white" />}
              {card?.title || (donationType === "monthly"
                ? "Become a Monthly Partner"
                : "Complete Your Donation")}
            </h2>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Card Description */}
            {card?.description && (
              <p className="text-gray-700 text-sm text-center">{card.description}</p>
            )}

            {/* Summary */}
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <p className="text-gray-700 text-sm">Donation Amount</p>
              <p className="text-2xl font-bold text-emerald-700">
                ${amount.toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {donationType === "monthly" ? "Charged monthly" : "One-time payment"}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-600 flex gap-2">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Form */}
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234..."
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? "Processing..." : "Complete Donation"}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}