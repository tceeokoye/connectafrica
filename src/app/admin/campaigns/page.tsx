"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import CampaignModal from "@/components/admin/campeign/create-campeign-modal";
import DeleteModal from "@/components/admin/campeign/delete-comfirmation-modal";
import { Campaign } from "@/types/global";
import AdminLayout from "@/components/AdminLayout";

export default function AdminCampaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/admin/campaign/get"); // your GET endpoint
      const data = await res.json();
      if (data.success) setCampaigns(data.campaigns);
      console.log("campains:", data);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);


  const calculateProgress = (campaign: Campaign) => {
    const collected = campaign.donatedAmount || 0;
    return Math.min((collected / campaign.amount) * 100, 100);
  };

  return (
    <AdminLayout>
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your organization's campaigns
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedCampaign(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          New Campaign
        </Button>
      </motion.div>

      {/* Campaign List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <p className="text-center col-span-full">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-center col-span-full">No campaigns available</p>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-card rounded-xl p-4 shadow-soft flex flex-col relative"
            >
              {" "}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                  {campaign.category}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                 <span className={`px-3 py-1 rounded-full  text-primary-foreground text-xs font-semibold flex items-center justify-center ${campaign.status === "inprogress" ? "bg-green-700" : campaign.status === "completed" ? "bg-blue-500" : "bg-red-500"}`}>
                  {campaign.status}
                </span>
              </div>
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{campaign.title}</h2>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                {campaign.description}
              </p>
              <p className="text-sm font-medium mb-2">
                Goal: ${campaign.amount.toLocaleString()} | Collected: $
                {(campaign.donatedAmount || 0).toLocaleString()}
              </p>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${calculateProgress(campaign)}%` }}
                ></div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setIsModalOpen(true); // open modal for editing
                  }}
                >
                  <Edit size={16} />
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setCampaignToDelete(campaign);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash2 size={16} />
                  Delete
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    alert("View details functionality coming soon")
                  }
                >
                  <Eye size={16} />
                  View
                </Button>
              </div>
            </div>
          ))
        )}
      </motion.div>

      {/* Campaign Modal for Create/Edit */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={selectedCampaign} // pass campaign for editing
        onSave={fetchCampaigns} // refresh after creation/edit
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        campaignId={campaignToDelete?._id}
        setCampaigns={setCampaigns}
      />
    </div>
    </AdminLayout>
  );
}
