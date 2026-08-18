"use client";

import React from "react";
import Layout from "../../components/layout/Layout";
import { ShieldCheck } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <Layout className="overflow-x-hidden">
      <section className="pt-36 pb-20 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Legal & Compliance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Terms of Use
          </h1>
          <p className="text-gray-400 text-sm">
            Effective Date: January 1, 2026 | Connect with Africa
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the Connect with Africa website, you agree to comply with and be bound by these Terms of Use and all applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Use of Content</h2>
            <p>
              All materials, content, logos, and images published on this website are the property of Connect with Africa or its partners and are protected by applicable copyright and trademark law. Content may not be reproduced or distributed without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Donations and Contributions</h2>
            <p>
              All donations made through our website are charitable contributions utilized in accordance with our stated humanitarian programs and mission. Contributions are recognized under Section 501(c)(3) of the Internal Revenue Code.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
            <p>
              Connect with Africa makes every effort to ensure the accuracy of information provided on this platform but assumes no liability for technical interruptions, typographical errors, or third-party links.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
