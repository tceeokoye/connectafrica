"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { ArrowRight, TrendingUp, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCampaigns } from "@/store/slices/campaignSlice";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const campaigns = useSelector(
    (state: RootState) => state.campaign.campaigns
  );

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

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
      <section className="py-20 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Active Campaigns
          </h1>
          <p className="text-muted-foreground text-lg">
            Support initiatives transforming African communities.
          </p>
        </motion.div>

        {/* 🔒 Sticky Category Filter */}
        <div className="sticky top-20 z-30 bg-background/80 backdrop-blur border-b mb-14">
          <div className="flex flex-wrap justify-center gap-3 py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat === "All" && <Filter size={14} />}
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns / Empty State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              Loading campaigns…
            </motion.div>
          ) : filteredCampaigns.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-24 text-muted-foreground"
            >
              <p className="text-lg font-medium">
                {selectedCategory === "All"
                  ? "No campaigns available right now."
                  : `No campaigns under "${selectedCategory}".`}
              </p>
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
                const progress =
                  (campaign.donatedAmount / campaign.amount) * 100;

                return (
                  <motion.article
                    key={campaign._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -6 }}
                    className="bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={campaign.imageUrl || ""}
                        alt={campaign.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                          {campaign.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {campaign.description}
                      </p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-primary"
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <TrendingUp size={16} className="text-green-500" />
                        <span>{campaign.volunteers} supporters</span>
                      </div>

                      <button className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90">
                        Contribute
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
}
