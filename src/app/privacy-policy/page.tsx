"use client";

import React from "react";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <Layout className="overflow-x-hidden">
      <section className="pt-36 pb-20 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Legal & Compliance
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Effective Date: January 1, 2026 | Connect with Africa
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p>
              Connect with Africa is committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, and protect the information you provide when visiting our website, donating, volunteering, or engaging with our humanitarian programs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, phone number, organization, country, and payment details when you make a contribution, sign up to volunteer, or submit inquiries through our contact forms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process donations and provide official tax-deductible contribution receipts.</li>
              <li>To respond to inquiries, partnership requests, and volunteer applications.</li>
              <li>To provide program updates, annual reports, and impact news.</li>
              <li>To maintain compliance with applicable nonprofit and charity regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
            <p>
              Connect with Africa does not sell, trade, or rent donor or visitor personal information to third parties. We share data only with trusted service providers (e.g., payment processors) strictly to facilitate operational functions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at:{" "}
              <a href="mailto:connectwithafrica1@gmail.com" className="text-emerald-600 font-semibold underline">
                connectwithafrica1@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
