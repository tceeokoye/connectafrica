"use client";

import { motion } from "framer-motion";
import { FileText, Shield, TrendingUp, Users, DollarSign, Award } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const transparencyItems = [
  {
    icon: DollarSign,
    title: "Fund Allocation",
    description: "86% of donations go directly to programs. Full breakdown available in annual reports.",
    details: ["Program delivery: 86%", "Admin & operations: 10%", "Fundraising: 4%"],
  },
  {
    icon: FileText,
    title: "Annual Reports",
    description: "Comprehensive yearly reports detailing programs, outcomes, and financial statements.",
    details: ["2024 Annual Report", "2023 Annual Report", "2022 Annual Report"],
  },
  {
    icon: Shield,
    title: "Certifications",
    description: "Maintain rigorous international standards and compliance certifications.",
    details: ["ISO 9001:2015", "NGO Quality Standard", "Tax Exempt Status"],
  },
  {
    icon: Award,
    title: "Accreditation",
    description: "Recognized and accredited by leading international NGO networks.",
    details: ["Global Aid Network", "African NGO Council", "Charity Navigator (4.9★)"],
  },
];

export const TransparencySection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            Trust & Accountability
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Commitment to Transparency
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe transparency builds trust. Here's how we operate with complete accountability to our donors and communities.
          </p>
        </motion.div>

        {/* Transparency Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {transparencyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <item.icon className="w-7 h-7 text-emerald-600" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
              
              <ul className="space-y-2">
                {item.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12 md:p-16 text-white text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Request Detailed Reports</h3>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Access our complete financial records, impact assessments, and governance documents to verify our work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" className="hover:scale-105 transition-transform">
                Download Annual Report
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition-transform">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransparencySection;
