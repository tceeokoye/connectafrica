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
import jwtDecode from "jwt-decode";
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

const MAX_VIDEO_DURATION_MIN = 30; // 30 minutes
const MAX_VIDEO_SIZE_MB = 100; // 100MB

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
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Populate for edit
  useEffect(() => {
    if (media) {
      setType(media.type);
      setTitle(media.title);
      setCategory(media.category);
      setPreview(media.type === "image" ? media.src : media.thumbnail || null);
      setThumbnail(media.thumbnail || null);
    } else {
      setType("image");
      setTitle("");
      setCategory("");
      setFile(null);
      setPreview(null);
      setThumbnail(null);
    }
  }, [media]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Check video file size
    if (type === "video" && selected.size / (1024 * 1024) > MAX_VIDEO_SIZE_MB) {
      toast.error(`Video too large! Maximum size is ${MAX_VIDEO_SIZE_MB}MB.`);
      setFile(null);
      setPreview(null);
      setThumbnail(null);
      return;
    }

    if (type === "video") {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(selected);

      video.addEventListener("loadedmetadata", () => {
        const durationMinutes = video.duration / 60;
        if (durationMinutes > MAX_VIDEO_DURATION_MIN) {
          toast.error(
            `Video too long! Maximum duration is ${MAX_VIDEO_DURATION_MIN} minutes.`
          );
          setFile(null);
          setPreview(null);
          setThumbnail(null);
          return;
        }

        // Generate thumbnail at 2 seconds
        video.currentTime = 2;
        video.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageUrl = canvas.toDataURL("image/png");

          setThumbnail(imageUrl); // separate thumbnail state
          setPreview(imageUrl);   // optional UI preview
        });
      });
    } else if (type === "image") {
      setPreview(URL.createObjectURL(selected));
      setThumbnail(null);
    }

    setFile(selected);
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

    if (!title || !category || (!file && !media)) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      let imageBase64: string | undefined = undefined;
      let videoBase64: string | undefined = undefined;
      let thumbnailBase64: string | undefined = undefined;

      if (file) {
        const readerResult = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

        if (type === "image") {
          imageBase64 = readerResult;
        } else if (type === "video") {
          videoBase64 = readerResult;
          thumbnailBase64 = thumbnail || undefined;
        }
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
          imageBase64,
          videoBase64,
          thumbnailBase64,
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

              <input
                type="file"
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={handleFileChange}
              />

              {preview && type === "image" && (
                <img
                  src={preview}
                  className="w-full h-40 object-cover rounded-xl"
                  alt="Preview"
                />
              )}

              {preview && type === "video" && (
                <div className="relative">
                  <video
                    src={file ? URL.createObjectURL(file) : undefined}
                    poster={thumbnail || undefined}
                    controls
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Saving..." : media ? "Update Media" : "Upload Media"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}