"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { ArrowRight, TrendingUp, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCampaigns } from "@/store/slices/campaignSlice";
import CampaignDonationModal from "@/components/CampaignDonationModal";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const campaigns = useSelector((state: RootState) => state.campaign.campaigns);

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  /** ✅ Fix hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  /** Fetch campaigns */
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/v1/admin/campaign/get");
        const data = await res.json();
        if (data.success) dispatch(setCampaigns(data.campaigns));
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [dispatch]);

  /** Categories */
  const categories = useMemo(() => {
    const cats = campaigns.map((c) => c.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [campaigns]);

  /** Filtered campaigns */
  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((c) => c.category === selectedCategory);

  /** Prevent SSR mismatch */
  if (!mounted) {
    return (
      <Layout>
        <section className="py-20 container mx-auto px-4" />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900/60 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" 
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-sm font-semibold mb-8"
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Our Active Initiatives
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Projects Making Real Impact
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every campaign is community-driven, transparent, and designed for measurable, sustainable impact. 
              See where your contributions are going and the difference they're making.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="pt-12 pb-20 container mx-auto px-4">
        {/* 🔒 Sticky Category Filter */}
        <div className="sticky top-[70px] md:top-20 z-30 w-full mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 py-4 px-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat === "All" && <Filter size={14} />}
                  {cat}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Campaigns / Empty State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-600"
            >
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
              <p className="mt-4">Loading campaigns…</p>
            </motion.div>
          ) : filteredCampaigns.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-24 text-gray-600"
            >
              <p className="text-lg font-medium">
                {selectedCategory === "All"
                  ? "No campaigns available at the moment."
                  : `No campaigns under "${selectedCategory}".`}
              </p>
              <p className="text-sm text-gray-500 mt-2">Check back soon for new initiatives.</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCampaigns.map((campaign) => {
                const progress = campaign.amount ? (campaign.donatedAmount / campaign.amount) * 100 : 0;
                const hasEnded = campaign.endDate && new Date(campaign.endDate) < new Date();

                return (
                  <motion.article
                    key={campaign._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -8 }}
                    className={`bg-white rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all ${
                      hasEnded
                        ? "border-gray-300 opacity-75 hover:shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100 ${hasEnded ? "grayscale" : ""}`}>
                      {campaign.imageUrl ? (
                        <img
                          src={campaign.imageUrl}
                          alt={campaign.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <TrendingUp className="w-12 h-12 text-emerald-400" />
                        </div>
                      )}
                      <div className={`absolute inset-0 ${hasEnded ? "bg-black/30" : "bg-gradient-to-t from-black/40 to-transparent"}`} />
                      <div className="absolute top-4 right-4">
                        <span className={`px-4 py-2 text-xs font-semibold rounded-full ${
                          hasEnded
                            ? "bg-gray-600 text-white"
                            : "bg-emerald-600 text-white"
                        }`}>
                          {hasEnded ? "Ended" : campaign.category || "Initiative"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">
                          {campaign.title}
                        </h3>
                        {hasEnded && (
                          <span className="text-xs font-bold text-red-600 whitespace-nowrap">CLOSED</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {campaign.description}
                      </p>

                      {/* Progress Section */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-gray-700">Funding Progress</span>
                          <span className="text-sm font-bold text-emerald-600">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${
                              hasEnded
                                ? "from-gray-400 to-gray-500"
                                : "from-emerald-500 to-emerald-600"
                            }`}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span>₦{(campaign.donatedAmount || 0).toLocaleString()}</span>
                          <span>₦{(campaign.amount || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-6 pb-6 border-b border-gray-100">
                        <TrendingUp size={16} className={hasEnded ? "text-gray-400" : "text-emerald-600"} />
                        <span className="font-semibold">{campaign.volunteers || 0}+ supporters contributing</span>
                      </div>

                      {hasEnded ? (
                        <button 
                          disabled
                          className="w-full px-4 py-3 bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center gap-2 font-semibold cursor-not-allowed">
                          Campaign Ended
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setIsDonationModalOpen(true);
                          }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all font-semibold">
                          Support This Campaign
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </section>

      {/* Campaign Donation Modal */}
      {selectedCampaign && (
        <CampaignDonationModal
          isOpen={isDonationModalOpen}
          onClose={() => {
            setIsDonationModalOpen(false);
            setSelectedCampaign(null);
          }}
          campaign={{
            _id: selectedCampaign._id,
            title: selectedCampaign.title,
            amount: selectedCampaign.amount || 0,
            donatedAmount: selectedCampaign.donatedAmount || 0,
          }}
        />
      )}
    </Layout>
  );
}
