"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import supply from "@/assets/hospitalSuply.jpeg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCampaigns } from "@/store/slices/campaignSlice";
import { useRouter } from "next/navigation";
import CampaignDonationModal from "@/components/CampaignDonationModal";

export default function CampaignSection() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const campaigns = useSelector((state: RootState) => state.campaign.campaigns);

  useEffect(() => setMounted(true), []);

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

  const urgentCampaign = campaigns.find((c) => {
    if (c?.priority === true) {
      // Check if campaign hasn't ended
      const endDate = new Date(c.endDate);
      const now = new Date();
      if (endDate < now) {
        return false; // Skip ended campaigns
      }
      return true;
    }
    return false;
  });
  const progress = urgentCampaign
    ? (urgentCampaign.donatedAmount / urgentCampaign.amount) * 100
    : 0;

  if (!mounted) return null;

  return (
    <>
      <section className="relative py-20 bg-background overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05),transparent_40%)]" />

        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-full lg:max-w-lg break-words"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-4 md:mb-6 animate-pulse">
                Current Priority
              </span>

              {urgentCampaign ? (
                <>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 break-words">
                    {urgentCampaign.title}
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 md:mb-8 break-words">
                    {urgentCampaign.description}
                  </p>

                  <Button
                    onClick={() => setIsDonationModalOpen(true)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 w-full flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                  >
                    Support the Campaign
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 break-words">
                    No Active Campaigns Right Now
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 md:mb-8 break-words">
                    All our current campaigns have been completed or are temporarily paused. 
                    We're grateful for your interest! Check back soon to support new healthcare initiatives in Africa.
                  </p>

                  <Button
                    onClick={() => router.push("/campaigns")}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 w-full flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                  >
                    View All Campaigns
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </motion.div>

            {/* Image & Progress */}
            {urgentCampaign && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full"
              >
                <div className="relative rounded-3xl overflow-hidden w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[500px] shadow-lg">
                  <Image
                    src={urgentCampaign.imageUrl || supply}
                    alt="Medical supplies"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Progress Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-8 left-0 md:left-[-28px] bg-card/90 backdrop-blur-md border border-white/10 p-5 sm:p-6 rounded-2xl shadow-2xl max-w-[300px]"
                >
                  <div className="mb-3">
                    <div className="flex justify-between text-sm sm:text-base mb-2 text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-semibold text-foreground">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-semibold text-primary">
                      ${urgentCampaign.donatedAmount?.toLocaleString() || 0} / ${urgentCampaign.amount?.toLocaleString() || 0}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Campaign Donation Modal */}
      {urgentCampaign && (
        <CampaignDonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          campaign={{
            _id: urgentCampaign._id,
            title: urgentCampaign.title,
            amount: urgentCampaign.amount || 0,
            donatedAmount: urgentCampaign.donatedAmount || 0,
          }}
        />
      )}
    </>
  );
}
