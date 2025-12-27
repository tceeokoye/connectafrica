"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campaign } from "@/types/global";

interface JwtPayload {
  exp: number;
}

const categories = [
  "Education",
  "Community",
  "Elderly",
  "Empowerment",
  "Children",
  "Healthcare",
  "Infrastructure",
  "Events",
  "Others",
  "Food",
  "Emergency",
];

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign; // optional for editing
  onSave?: () => Promise<void>; // optional callback after save
}

export default function CampaignModal({
  isOpen,
  onClose,
  campaign,
  onSave,
}: CampaignModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState("");

  const token = useSelector((state: RootState) => state.token.token);
  const router = useRouter();

  useEffect(() => {
    if (campaign) {
      setCategory(campaign.category);
      setTitle(campaign.title);
      setDescription(campaign.description);
      setAmount(String(campaign.amount));
      setStartDate(new Date(campaign.startDate));
      setEndDate(new Date(campaign.endDate));
      setPreview(campaign.imageUrl);
    } else {
      setCategory("");
      setTitle("");
      setDescription("");
      setAmount("");
      setImage(null);
      setPreview(null);
      setStartDate(null);
      setEndDate(null);
    }
  }, [campaign]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setLoading(false);
      onClose();
      toast.error("Login expired, redirecting...");
      router.push("/admin/login");
      return;
    }



    if (!title || !description || !amount || !startDate || !endDate || !category || (!campaign && !image)) {
      setLoading(false);
      toast.error("All fields including image and amount are required");
      return;
    }

    try {
      // Convert image to Base64
      let imageBase64 = preview;
      if (image) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
        });
      }

      const startDateStr = startDate.toISOString();
      const endDateStr = endDate.toISOString();
      const method = campaign ? "PUT" : "POST";
      const url = campaign
        ? `/api/v1/admin/campaign/edit/${campaign._id}`
        : "/api/v1/admin/campaign/create";

      // Optional: Check if another Emergency campaign exists
      if (!campaign && category === "Emergency") {
        const checkRes = await fetch("/api/v1/admin/campaign/emergency-check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const checkData = await checkRes.json();
        if (checkData.exists) {
          toast.error("Only one active Emergency campaign is allowed.");
          setLoading(false);
          return;
        }
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          amount,
          category,
          startDate: startDateStr,
          endDate: endDateStr,
          imageBase64,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success(campaign ? "Campaign updated!" : "Campaign created successfully!");
      if (onSave) await onSave();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save campaign");
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-4">
              {campaign ? "Edit Campaign" : "New Campaign"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Campaign title"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Brief campaign description"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Project Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter project amount"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              {/* Category */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent position="popper" className="max-h-60 overflow-y-auto">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Start & End Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholderText="Select start date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholderText="Select end date"
                  />
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Campaign Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-full h-24 sm:w-32 sm:h-32 md:w-full md:h-40 object-cover rounded-xl border border-gray-200"
                  />
                )}
              </div>

              <Button type="submit" variant="default" className="w-full mt-4" disabled={loading}>
                {loading
                  ? campaign
                    ? "Updating..."
                    : "Creating..."
                  : campaign
                  ? "Update Campaign"
                  : "Create Campaign"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
