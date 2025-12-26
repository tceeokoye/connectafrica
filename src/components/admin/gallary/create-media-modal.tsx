"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface JwtPayload {
  exp: number;
}

interface MediaItem {
  _id?: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  category: string;
}

interface GalleryMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media?: MediaItem; // edit mode
  onSave?: () => Promise<void>;
}
const categories = [
  "Outreach",
  "Team",
  "Community",
  "Elderly",
  "Empowerment",
  "Children",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Events",
  "Others",
];
export default function GalleryMediaModal({
  isOpen,
  onClose,
  media,
  onSave,
}: GalleryMediaModalProps) {
  const token = useSelector((state: RootState) => state.token.token);

  const [type, setType] = useState<"image" | "video">("image");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Populate for edit
  useEffect(() => {
    if (media) {
      setType(media.type);
      setTitle(media.title);
      setCategory(media.category);
      setPreview(media.type === "image" ? media.src : media.thumbnail || null);
      setVideoUrl(media.type === "video" ? media.src : "");
    } else {
      setType("image");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setVideoUrl("");
    }
  }, [media]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Auth check
    try {
      if (!token) throw new Error("Session expired");
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) throw new Error("Session expired");
    } catch {
      toast.error("Session expired. Please login again");
      setLoading(false);
      return;
    }

    if (
      !title ||
      !category ||
      (type === "image" && !file && !media) ||
      (type === "video" && !videoUrl)
    ) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      let imageBase64 = preview;

      if (file) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
      }

      const method = media ? "PUT" : "POST";
      const url = media
        ? `/api/v1/admin/gallary/edit/${media._id}`
        : `/api/v1/admin/gallary/create`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          title,
          category,
          imageBase64: type === "image" ? imageBase64 : undefined,
          videoUrl: type === "video" ? videoUrl : undefined,
          thumbnailBase64: type === "video" ? imageBase64 : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      toast.success(
        media ? "Media updated successfully" : "Media uploaded successfully"
      );
      if (onSave) await onSave();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save media");
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {media ? "Edit Media" : "Upload Media"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Media title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  className="max-h-60 overflow-y-auto"
                >
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={type}
                onValueChange={(v) => setType(v as "image" | "video")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>

              {type === "image" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              ) : (
                <>
                  <Input
                    placeholder="YouTube / Video embed URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </>
              )}

              {preview && (
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded-xl"
                />
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading
                  ? "Saving..."
                  : media
                  ? "Update Media"
                  : "Upload Media"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
