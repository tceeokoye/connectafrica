"use client";

import React from "react";
import Layout from "../../components/layout/Layout";
import { ShieldCheck, HeartHandshake } from "lucide-react";

export default function DonorPrivacyPolicyPage() {
  return (
    <Layout className="overflow-x-hidden">
      <section className="pt-36 pb-20 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            Donor Stewardship
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
            Donor Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Effective Date: January 1, 2026 | Connect with Africa
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-8 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Donor Privacy Commitment</h2>
            <p>
              Connect with Africa values the trust our donors place in us. We are committed to maintaining the highest level of confidentiality and transparency regarding donor information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Donor Information Security</h2>
            <p>
              We collect donor information (names, contact details, donation amounts, and designation preferences) solely for processing contributions, issuing tax receipts, and providing stewardship reporting on program outcomes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Selling or Renting of Donor Lists</h2>
            <p>
              Connect with Africa will not sell, trade, rent, or share our donor list or personal contact details with any other organization or entity, nor will we send mailings on behalf of other organizations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Opt-Out & Preferences</h2>
            <p>
              Donors may contact us at any time to review personal information collected, request corrections, or opt-out of future communications by emailing{" "}
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
