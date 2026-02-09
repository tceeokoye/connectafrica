"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Globe, MapPin, Phone, Send, CheckCircle2, Clock, Users, Shield } from "lucide-react";
import { useContact } from "../../hooks/useContact";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "connectwithafrica@gmail.com",
    href: "mailto:connectwithafrica@gmail.com",
    description: "Our team responds within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    description: "Available Monday-Friday, 9AM-5PM EST",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "United States",
    href: null,
    description: "Operating across multiple regions",
  },
  {
    icon: Globe,
    title: "Website",
    value: "www.connectwithafrica.org",
    href: "https://www.connectwithafrica.org",
    description: "Visit our site for more information",
  },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry", icon: "💬" },
  { value: "donation", label: "Donation Support", icon: "❤️" },
  { value: "partnership", label: "Partnership", icon: "🤝" },
  { value: "volunteer", label: "Volunteer", icon: "👥" },
  { value: "corporate", label: "Corporate Giving", icon: "🏢" },
  { value: "media", label: "Media/Press", icon: "📰" },
];

const responseMetrics = [
  { icon: Clock, label: "Quick Response", value: "24 hours average" },
  { icon: CheckCircle2, label: "High Resolution Rate", value: "95% satisfaction" },
  { icon: Users, label: "Dedicated Team", value: "Always available" },
  { icon: Shield, label: "Confidential", value: "All info secure" },
];

export default function ContactPage() {
  const { sendContactMessage, loading } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContactMessage(formData);
      toast.success("Message sent successfully! We'll be in touch soon.");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "general",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Failed to send message. Please try again.";
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
    <Layout>
      {/* Professional Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-300 rounded-full text-sm font-medium mb-6 border border-emerald-500/30"
            >
              We're Here to Listen
            </motion.span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
              Have questions about our mission? Want to partner with us? Or ready to make a difference? Let's connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Response Metrics */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {responseMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{metric.label}</h3>
                <p className="text-slate-600 text-sm">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-600/10 group-hover:to-emerald-600/5 rounded-xl transition-all duration-300" />
                    <div className="relative p-5 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm break-all"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-slate-600 text-sm">{item.value}</p>
                          )}
                          <p className="text-slate-500 text-xs mt-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Corporate Giving CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl text-white"
              >
                <h3 className="font-display text-lg font-bold mb-3">
                  Corporate Partnerships
                </h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Looking to make a corporate donation or potential partnership? Our corporate giving team would love to discuss how we can work together.
                </p>
                <Button
                  className="w-full bg-white text-emerald-600 hover:bg-emerald-50 font-semibold"
                >
                  Explore Partnership Options
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center py-12">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-slate-600">
                        Thank you for reaching out. Our team will get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Inquiry Type Selection */}
                      <div>
                        <Label className="text-base font-semibold text-slate-900 mb-4 block">
                          What can we help you with?
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {inquiryTypes.map((type) => (
                            <motion.button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, type: type.value })}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                                formData.type === type.value
                                  ? "border-emerald-600 bg-emerald-50"
                                  : "border-gray-200 bg-white hover:border-emerald-300"
                              }`}
                            >
                              <div className="text-2xl mb-2">{type.icon}</div>
                              <div className="text-sm font-medium text-slate-900">
                                {type.label}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Name & Email Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="font-semibold text-slate-900 mb-2 block">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="font-semibold text-slate-900 mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Phone & Subject Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="font-semibold text-slate-900 mb-2 block">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject" className="font-semibold text-slate-900 mb-2 block">
                            Subject *
                          </Label>
                          <Input
                            id="subject"
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we assist?"
                            required
                            className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message" className="font-semibold text-slate-900 mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please share your message or inquiry with us..."
                          rows={6}
                          required
                          className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                        />
                      </div>

                      {/* Privacy Notice */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">Privacy Promise:</span> We respect your privacy. Your contact information will never be shared with third parties and will only be used to respond to your inquiry.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-base rounded-lg transition-all duration-300"
                        >
                          {loading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            <>
                              <Send className="mr-2 w-5 h-5 inline" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Frequently Asked Questions?
            </h2>
            <p className="text-slate-300 mb-8">
              Explore our resource center for answers to common questions about our programs, donations, and partnerships.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              Visit Our FAQ
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
