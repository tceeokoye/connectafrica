"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function DonationSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [donation, setDonation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const [shouldShowNote, setShouldShowNote] = useState(false);

  useEffect(() => {
    const verifyDonation = async () => {
      try {
        setLoading(true);

        // Get the full URL to handle malformed query strings (PayPal callback)
        const fullUrl = window.location.href;
        console.log("🔗 Full URL:", fullUrl);

        // Extract reference - handle malformed URLs with multiple ?
        let reference = "";
        const urlParts = fullUrl.split("?");
        
        // Try all query string parts
        for (let i = 1; i < urlParts.length; i++) {
          const params = new URLSearchParams(urlParts[i]);
          const ref = params.get("reference") || params.get("paymentReference");
          if (ref) {
            reference = ref;
            break;
          }
        }

        // If not found in URL, try localStorage
        if (!reference) {
          const storedData = localStorage.getItem("donation_reference");
          if (!storedData) {
            setError("No donation reference found. Please try again.");
            return;
          }
          const parsed = JSON.parse(storedData);
          reference = parsed.reference;
        }

        if (!reference) {
          setError("Missing transaction reference");
          return;
        }

        console.log("🔍 Verifying donation with reference:", reference);

        // Get stored donation timestamp for security check
        const storedData = localStorage.getItem("donation_reference");
        let isRecent = true;
        if (storedData) {
          const { timestamp } = JSON.parse(storedData);
          // Security check: donation should be recent (within 3 hours to account for webhook processing)
          isRecent = Date.now() - timestamp < 10800000; // 3 hours
          if (!isRecent) {
            setError("Donation reference expired. Please initiate a new donation.");
            localStorage.removeItem("donation_reference");
            return;
          }
        }

        // Verify donation with backend (secure verification)
        const response = await fetch(
          `/api/v1/user/donations/verify?reference=${encodeURIComponent(reference)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("✅ Verification response:", data);

        if (data.success && data.donation) {
          setDonation({
            ...data.donation,
            reference: data.donation.reference || reference,
          });

          // If donation is still pending, try to confirm payment with Monnify
          if (data.donation.status === "pending") {
            console.log("⏳ Donation is pending, processing PayPal confirmation...");
            try {
              const confirmResponse = await fetch(
                "/api/v1/user/donations/confirm-payment",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ reference }),
                }
              );

              const confirmData = await confirmResponse.json();
              console.log("🔄 Confirm response:", confirmData);

              if (confirmData.success && confirmData.donation) {
                // Update with confirmed donation
                setDonation({
                  ...confirmData.donation,
                  reference: confirmData.donation.reference || reference,
                });
              }
            } catch (confirmErr) {
              console.error("Error confirming payment:", confirmErr);
              // Continue with pending status
            }
          }

          // Clear stored reference
          localStorage.removeItem("donation_reference");
        } else {
          setError(data.message || "Unable to verify donation");
        }
      } catch (err: any) {
        console.error("Verification error:", err);
        setError("Error verifying donation. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyDonation();
  }, [searchParams]);

  // Poll for payment confirmation if still pending
  useEffect(() => {
    // Only start polling if we have a donation and it's not completed yet
    if (!donation || donation.status === "completed") return;

    let pollInterval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const startPolling = () => {
      pollInterval = setInterval(async () => {
        setPollCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 10) {
            setShouldShowNote(true);
          }
          return newCount;
        });

        try {
          const urlParams = new URLSearchParams(window.location.search);
          let ref = urlParams.get("reference");
          
          if (!ref) {
            const storedData = localStorage.getItem("donation_reference");
            if (storedData) {
              ref = JSON.parse(storedData).reference;
            }
          }
          
          if (!ref) return;

          const response = await fetch(
            `/api/v1/user/donations/verify?reference=${encodeURIComponent(ref)}`,
            { method: "GET" }
          );
          const data = await response.json();

          if (data.success && data.donation && data.donation.status === "completed") {
            console.log("✅ Payment confirmed!");
            setDonation(data.donation);
            if (pollInterval) clearInterval(pollInterval);
            if (timeout) clearTimeout(timeout);
            localStorage.removeItem("donation_reference");
          }
        } catch (err) {
          console.error("Poll error:", err);
        }
      }, 3000); // Poll every 3 seconds
    };

    startPolling();

    // After 30 seconds, if still pending, redirect to failed page
    timeout = setTimeout(() => {
      if (pollInterval) clearInterval(pollInterval);
      
      // Double-check one last time before redirecting
      const urlParams = new URLSearchParams(window.location.search);
      let ref = urlParams.get("reference");
      
      if (!ref) {
        const storedData = localStorage.getItem("donation_reference");
        if (storedData) {
          ref = JSON.parse(storedData).reference;
        }
      }

      // If we're here and donation is still pending, the payment likely failed
      if (ref && donation && donation.status === "pending") {
        console.log("❌ Payment failed or timeout - redirecting to failure page");
        localStorage.removeItem("donation_reference");
        // Redirect to failed page with reference for more info
        router.push(`/donate/failed?reference=${encodeURIComponent(ref)}&reason=timeout`);
      }
    }, 30000);

    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (timeout) clearTimeout(timeout);
    };
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mb-6"></div>
            <p className="text-gray-600 text-lg">Verifying your donation...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !donation) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="text-red-600 mb-4 flex justify-center">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-red-700 mb-6">{error}</p>
            <div className="space-y-3">
              <Link href="/campaigns">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Back to Campaigns
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Icon - Changes based on payment status */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {donation.status === "completed" ? (
                <>
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <CheckCircle className="w-24 h-24 text-emerald-600 relative" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="w-24 h-24 relative">
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600 text-4xl">↻</div>
                  </div>
                </>
              )}
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
              {donation.status === "completed" ? "Thank You!" : "Finalizing Your Donation"}
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              {donation.status === "completed"
                ? "Your donation has been successfully processed"
                : "We're confirming your payment with PayPal. This usually takes a few seconds..."}
            </p>

            {/* Donation Details */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 md:p-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Donor Name</span>
                  <span className="text-gray-900 font-bold">
                    {donation.firstName} {donation.lastName}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Donation Amount</span>
                  <span className="text-emerald-600 font-bold text-2xl">
                    ${(donation.amount || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Email Address</span>
                  <span className="text-gray-900 underline">{donation.email}</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Status</span>
                  <div className="flex items-center gap-2">
                    {donation.status === "completed" ? (
                      <>
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm">
                          Confirmed
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-semibold text-sm">
                          Processing
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-semibold">Reference ID</span>
                  <span className="text-gray-900 font-mono text-sm bg-white px-3 py-1 rounded border border-gray-200">
                    {donation.reference}
                  </span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-8">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Your Impact
              </h3>
              <p className="text-blue-800">
                Your generous donation of ${donation.amount?.toLocaleString() || 0} will directly
                support essential medical supplies and healthcare initiatives across Africa. 
                You'll receive a receipt and updates on the impact of your contribution via email at{" "}
                <span className="font-semibold">{donation.email}</span>.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {donation.status === "completed" ? (
                <>
                  <Link href="/campaigns">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg font-semibold">
                      View More Campaigns
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => {
                      const text = `I just donated $${donation.amount?.toLocaleString() || 0} to support crucial medical initiatives in Africa through Connect Africa! 🤝❤️ #ConnectAfrica #GlobalHealth`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`;
                      window.open(url, "_blank");
                    }}
                    className="w-full px-6 py-6 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share on Twitter
                  </button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
                  >
                    Refresh Status
                  </Button>
                  {shouldShowNote && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <p className="text-blue-900 font-semibold mb-1">Still Processing?</p>
                      <p className="text-blue-800 text-sm mb-3">Confirmation can take a minute. Check your inbox at <span className="font-mono text-xs">{donation.email}</span> for a receipt.</p>
                      <Link href="/campaigns">
                        <Button variant="outline" className="w-full">
                          Back to Campaigns
                        </Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
            
            {/* Campaign Update Notice */}
            {donation.status === "completed" ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-emerald-900">Payment Confirmed!</p>
                  <p className="text-emerald-800 text-sm">Your ₦{(donation.amount || 0).toLocaleString()} donation has been added to the campaign and a confirmation email will arrive shortly.</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <span className="text-2xl animate-spin">⏳</span>
                <div>
                  <p className="font-semibold text-amber-900">Finalizing Payment...</p>
                  <p className="text-amber-800 text-sm">Your payment is being confirmed. This usually takes a few seconds. You'll receive a confirmation email at <span className="font-mono text-xs">{donation.email}</span> once complete.</p>
                </div>
              </div>
            )}

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Check your email at <span className="font-semibold">{donation.email}</span> for a donation receipt</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Receive regular updates on how your donation is making a difference</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Visit our blog to learn more about our ongoing initiatives and impact stories</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Join our community of supporters and follow us on social media</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
