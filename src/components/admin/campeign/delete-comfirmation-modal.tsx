"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface Campaign {
  _id: string;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  createdAt: string;
  collectedAmount?: number;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId?: string; // ID of the campaign to delete
  setCampaigns?: React.Dispatch<React.SetStateAction<Campaign[]>>; // update parent campaigns state
}

export default function DeleteModal({
  isOpen,
  onClose,
  campaignId,
  setCampaigns,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 const token = useSelector((state: RootState) => state.token.token);

  const handleDelete = async () => {
    if (!campaignId || !setCampaigns) return;

    setLoading(true);
    try {
      if (!token) {
       
        onClose();
        toast.error("Login expired, redirecting...");
        router.push("/admin/auth/login"); // or /admin/dashboard
        return; // stop execution
      }

      const res = await fetch(`/api/v1/admin/campaign/delete/${campaignId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        // Token invalid or expired
        onClose();
        toast.error("Session expired, redirecting...");
        router.push("/admin/auth/login"); // redirect
        return;
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // Remove campaign from parent state
      setCampaigns((prev) => prev.filter((c) => c._id !== campaignId));
      toast.success("Campaign deleted successfully");
      onClose();
    } catch (err: any) {
      console.error("Delete failed:", err);
      toast.error(err.message || "Failed to delete campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-4">
              Delete Campaign
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete this campaign? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
