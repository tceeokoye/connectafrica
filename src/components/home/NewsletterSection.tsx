"use client";

import { motion } from "framer-motion";
import { Mail, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNewsletter } from "../../hooks/useNewsletter";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { subscribe, loading } = useNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await subscribe(email);
      if (response.success) {
        setMessage(response.message || "Thank you for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        setError(response.message || "Failed to subscribe. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred. Please try again.");
      console.error("Newsletter subscription error:", err);
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Get monthly updates on our latest initiatives, impact stories, and ways you can help.
          </p>
          <p className="text-sm text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg whitespace-nowrap"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-600 text-sm justify-center bg-green-50 p-4 rounded-lg"
            >
              <AlertCircle className="w-4 h-4" />
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-600 text-sm justify-center bg-red-50 p-4 rounded-lg"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            By subscribing, you agree to our Privacy Policy. We'll send you occasional updates about our work and impact.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;
