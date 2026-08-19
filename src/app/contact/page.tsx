"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Mail,
  Globe,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useContact } from "../../hooks/useContact";
import { toast } from "sonner";
import heroBg from "@/assets/hospitalSuply.jpeg";

const helpOptions = [
  "I want to donate",
  "I want to donate medical supplies",
  "I want to volunteer",
  "I want to become a partner",
  "I want to sponsor a program",
  "I want to learn more",
  "Other",
];

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "connectwithafrica1@gmail.com",
    href: "mailto:connectwithafrica1@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (818) 300-5881",
    href: "tel:+18183005881",
  },
  {
    icon: Globe,
    title: "Website",
    value: "www.connectwithafrica.org",
    href: "https://www.connectwithafrica.org",
  },
  {
    icon: MapPin,
    title: "Official Mailing Address",
    value: "Connect with Africa, United States",
    href: null,
  },
];

export default function ContactPage() {
  const { sendContactMessage, loading } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    country: "",
    helpChoice: "I want to learn more",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[${formData.helpChoice}] from ${formData.name} (${formData.country || "General"})`,
        message: `Organization: ${formData.organization || "N/A"}\nCountry: ${formData.country || "N/A"}\nReason: ${formData.helpChoice}\n\nMessage:\n${formData.message}`,
        type: formData.helpChoice,
      });
      toast.success("Thank you! Your message has been sent.");
      setSubmitted(true);
      setFormData({
        name: "",
        organization: "",
        email: "",
        phone: "",
        country: "",
        helpChoice: "I want to learn more",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to send message. Please try again or email us directly.";
      toast.error(errorMessage);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-green-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Connecting with African communities"
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
            CONTACT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Let&apos;s Connect
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Whether you want to donate, volunteer, partner with us, donate medical supplies, or learn more about our work, we would love to hear from you.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTACT FORM & INFO ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Contact Information
                  </h2>
                  <p className="text-emerald-700 font-semibold text-base">
                    Connect with Africa
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  {contactDetails.map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                          {item.title}
                        </h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-gray-900 hover:text-emerald-600 font-semibold text-sm sm:text-base transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-semibold text-sm sm:text-base">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Recognized 501(c)(3) humanitarian organization dedicated to equipping frontline clinics and empowering African communities.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-gray-600 text-base max-w-md mx-auto">
                        Thank you for reaching out to Connect with Africa. Our team will review your message and connect with you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="border-b border-gray-100 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Contact Form
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Fill out the fields below and our team will get in touch.
                        </p>
                      </div>

                      {/* Name & Organization */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-sm font-bold text-gray-700 mb-2 block">
                            Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                          />
                        </div>

                        <div>
                          <Label htmlFor="organization" className="text-sm font-bold text-gray-700 mb-2 block">
                            Organization
                          </Label>
                          <Input
                            id="organization"
                            name="organization"
                            placeholder="Clinic, NGO, Company, etc."
                            value={formData.organization}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email" className="text-sm font-bold text-gray-700 mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-bold text-gray-700 mb-2 block">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Country & How Can We Help Dropdown */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="country" className="text-sm font-bold text-gray-700 mb-2 block">
                            Country
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            placeholder="Your country"
                            value={formData.country}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                          />
                        </div>

                        <div>
                          <Label htmlFor="helpChoice" className="text-sm font-bold text-gray-700 mb-2 block">
                            How Can We Help? *
                          </Label>
                          <select
                            id="helpChoice"
                            name="helpChoice"
                            value={formData.helpChoice}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm"
                          >
                            {helpOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message" className="text-sm font-bold text-gray-700 mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Write your message here..."
                          value={formData.message}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <div>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-lg flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
                              <span>SUBMIT</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
