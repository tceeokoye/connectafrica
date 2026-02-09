"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { XCircle, AlertTriangle, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DonationFailedPage() {
  const searchParams = useSearchParams();
  const [reason, setReason] = useState<string>("Payment was not completed");
  const [reference, setReference] = useState<string>("");

  useEffect(() => {
    // Get failure reason from query params
    const failureReason = searchParams.get("failureReason") || searchParams.get("message") || searchParams.get("reason");
    
    if (failureReason === "timeout" || failureReason === "pending") {
      setReason("Payment confirmation took too long. This usually means your bank declined the transaction or there was a network issue. No funds were deducted from your account.");
    } else if (failureReason) {
      setReason(decodeURIComponent(failureReason));
    }

    // Get transaction reference if available
    const ref = searchParams.get("transactionReference") || searchParams.get("reference");
    if (ref) {
      setReference(ref);
    }

    // Clear donation reference from localStorage
    localStorage.removeItem("donation_reference");
  }, [searchParams]);

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <XCircle className="w-24 h-24 text-red-600 relative" />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
              Payment Failed
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              Unfortunately, your donation could not be processed
            </p>

            {/* Error Details */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">
                    Why This Happened
                  </h3>
                  <p className="text-red-800 text-lg">{reason}</p>
                </div>
              </div>

              {reference && (
                <div className="bg-white rounded p-4 text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Reference ID:</span>
                  <br />
                  <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    {reference}
                  </code>
                </div>
              )}
            </div>

            {/* Common Issues & Solutions */}
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">
                Common Reasons & Solutions
              </h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">•</span>
                  <span>
                    <strong>Insufficient Funds:</strong> Ensure your account has
                    sufficient balance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">•</span>
                  <span>
                    <strong>Card/Account Issues:</strong> Try a different payment
                    method
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">•</span>
                  <span>
                    <strong>Network Error:</strong> Check your internet connection
                    and retry
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">•</span>
                  <span>
                    <strong>Transaction Limit:</strong> Your bank may have set
                    limits on transactions
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <Link href="/campaigns">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold">
                  Try Again
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" className="w-full py-6 text-lg font-semibold">
                  Go to Donation Page
                </Button>
              </Link>
            </div>

            {/* Support Section */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Need Help?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email Support</p>
                    <p className="text-gray-600 text-sm mb-3">
                      Get help from our support team
                    </p>
                    <a
                      href="mailto:support@connectafrica.org"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                    >
                      support@connectafrica.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Contact Us</p>
                    <p className="text-gray-600 text-sm mb-3">
                      Speak with someone directly
                    </p>
                    <Link href="/contact">
                      <span className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm cursor-pointer">
                        Contact Form
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reassurance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 text-lg mb-4">
              💚 We're committed to making donations easy and secure
            </p>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 mb-4">
                Your security is our priority. No funds were charged from your account.
                Feel free to try again with:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>✓ A different payment method</li>
                <li>✓ After confirming account balance</li>
                <li>✓ After checking with your bank</li>
              </ul>
              <p className="text-sm text-gray-500">
                Questions? Our support team is here to help!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
