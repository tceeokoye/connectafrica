"use client";

import { useState, useEffect, useRef } from "react";
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
import { X, Upload, Plus, Image as ImageIcon, Video, Trash2, CheckCircle2 } from "lucide-react";
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
  images?: string[];
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

interface SelectedImageItem {
  id: string;
  file?: File;
  previewUrl: string;
  isExisting?: boolean;
}

export default function GalleryMediaModal({
  isOpen,
  onClose,
  media,
  onSave,
}: GalleryMediaModalProps) {
  const token = useSelector((state: RootState) => state.token.token);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState<"image" | "video">("image");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  
  // Multi-image state
  const [selectedImages, setSelectedImages] = useState<SelectedImageItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Video state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Populate for edit mode or reset
  useEffect(() => {
    if (media) {
      setType(media.type);
      setTitle(media.title);
      setCategory(media.category);
      if (media.type === "image") {
        const existingUrls = media.images && media.images.length > 0 
          ? media.images 
          : media.src 
          ? [media.src] 
          : [];
        setSelectedImages(
          existingUrls.map((url, idx) => ({
            id: `existing-${idx}-${Date.now()}`,
            previewUrl: url,
            isExisting: true,
          }))
        );
        setVideoFile(null);
        setVideoThumbnail(null);
      } else {
        setSelectedImages([]);
        setVideoFile(null);
        setVideoThumbnail(media.thumbnail || null);
      }
    } else {
      setType("image");
      setTitle("");
      setCategory("");
      setSelectedImages([]);
      setVideoFile(null);
      setVideoThumbnail(null);
    }
  }, [media, isOpen]);

  const handleImageFiles = (files: FileList | File[]) => {
    const newItems: SelectedImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return;
      }
      newItems.push({
        id: `file-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        isExisting: false,
      });
    });
    setSelectedImages((prev) => [...prev, ...newItems]);
  };

  const handleVideoFile = (selected: File) => {
    if (selected.size / (1024 * 1024) > MAX_VIDEO_SIZE_MB) {
      toast.error(`Video too large! Maximum size is ${MAX_VIDEO_SIZE_MB}MB.`);
      setVideoFile(null);
      setVideoThumbnail(null);
      return;
    }

    const video = document.createElement("video");
    video.src = URL.createObjectURL(selected);

    video.addEventListener("loadedmetadata", () => {
      const durationMinutes = video.duration / 60;
      if (durationMinutes > MAX_VIDEO_DURATION_MIN) {
        toast.error(
          `Video too long! Maximum duration is ${MAX_VIDEO_DURATION_MIN} minutes.`
        );
        setVideoFile(null);
        setVideoThumbnail(null);
        return;
      }

      // Generate thumbnail at 2 seconds
      video.currentTime = Math.min(2, video.duration / 2);
      video.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL("image/png");
        setVideoThumbnail(imageUrl);
      });
    });

    setVideoFile(selected);
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (type === "image") {
        handleImageFiles(e.dataTransfer.files);
      } else {
        handleVideoFile(e.dataTransfer.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress("");

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

    if (!title.trim() || !category) {
      toast.error("Please fill in title and category");
      setLoading(false);
      return;
    }

    if (type === "image" && selectedImages.length === 0) {
      toast.error("Please select at least one image");
      setLoading(false);
      return;
    }

    if (type === "video" && !videoFile && !media) {
      toast.error("Please select a video file");
      setLoading(false);
      return;
    }

    try {
      if (type === "image") {
        const newImagesToUpload = selectedImages.filter((img) => !img.isExisting && img.file);
        const existingImageUrls = selectedImages
          .filter((img) => img.isExisting)
          .map((img) => img.previewUrl);

        setUploadProgress(`Processing ${newImagesToUpload.length} new photos...`);

        // Convert files to base64
        const imagesBase64: string[] = [];
        for (let i = 0; i < newImagesToUpload.length; i++) {
          const item = newImagesToUpload[i];
          if (item.file) {
            setUploadProgress(`Preparing photo ${i + 1} of ${newImagesToUpload.length}...`);
            const base64 = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(item.file!);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
            });
            imagesBase64.push(base64);
          }
        }

        setUploadProgress("Uploading to cloud...");

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
            type: "image",
            title: title.trim(),
            category,
            imagesBase64,
            existingImages: existingImageUrls,
          }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        toast.success(
          media ? "Media updated successfully" : "Photos uploaded successfully"
        );
      } else {
        // Video upload
        let videoBase64: string | undefined = undefined;
        let thumbnailBase64: string | undefined = videoThumbnail || undefined;

        if (videoFile) {
          setUploadProgress("Preparing video file...");
          videoBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(videoFile);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
        }

        setUploadProgress("Uploading video...");

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
            type: "video",
            title: title.trim(),
            category,
            videoBase64,
            thumbnailBase64,
          }),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message);

        toast.success(
          media ? "Video updated successfully" : "Video uploaded successfully"
        );
      }

      if (onSave) await onSave();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save media");
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {media ? "Edit Media Post" : "Create Media Post"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {type === "image"
                  ? "Upload one or multiple photos just like Facebook & Instagram"
                  : "Upload a video with automatic thumbnail generation"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-muted/60 rounded-2xl border border-border">
                <button
                  type="button"
                  onClick={() => setType("image")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    type === "image"
                      ? "bg-card text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  Photos / Carousel
                </button>
                <button
                  type="button"
                  onClick={() => setType("video")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    type === "video"
                      ? "bg-card text-foreground shadow-sm border border-border/50"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>
              </div>

              {/* Title Input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Post Title *
                </label>
                <Input
                  placeholder="e.g., Medical Supplies Delivered to Gbazgo Clinic"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl h-11"
                  required
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Category *
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Select a category" />
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
              </div>

              {/* Image Upload & Multi-Image Gallery Area */}
              {type === "image" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Photos ({selectedImages.length})
                    </label>
                    {selectedImages.length > 0 && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {selectedImages.length === 1 ? "1 photo selected" : `${selectedImages.length} photos in carousel`}
                      </span>
                    )}
                  </div>

                  {/* Drag & Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-emerald-500 bg-emerald-500/10 scale-[1.01]"
                        : "border-border hover:border-emerald-500/50 hover:bg-muted/30"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) handleImageFiles(e.target.files);
                      }}
                    />
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Click to browse or drag & drop multiple photos
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports JPG, PNG, WEBP, GIF (Select multiple at once)
                    </p>
                  </div>

                  {/* Multi-Image Preview Grid (FB/IG Style) */}
                  {selectedImages.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        First photo will be the main cover photo:
                      </p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-1">
                        {selectedImages.map((img, idx) => (
                          <div
                            key={img.id}
                            className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-border shadow-sm"
                          >
                            <img
                              src={img.previewUrl}
                              alt={`Selected ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />

                            {/* Badge */}
                            <div className="absolute top-1.5 left-1.5 z-10">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                idx === 0
                                  ? "bg-emerald-600 text-white"
                                  : "bg-black/70 text-white/90"
                              }`}>
                                {idx === 0 ? "Cover" : `#${idx + 1}`}
                              </span>
                            </div>

                            {/* Delete overlay button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(img.id);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 hover:scale-110 transition-all shadow-md"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}

                        {/* Add more button tile */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-emerald-500/50 hover:bg-muted/40 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-all"
                        >
                          <Plus size={20} />
                          <span className="text-[11px] font-bold">Add more</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Video Upload Area */}
              {type === "video" && (
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    Video File *
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-border hover:border-emerald-500/50 hover:bg-muted/30"
                    }`}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleVideoFile(e.target.files[0]);
                      }}
                      className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      MP4, WEBM, MOV (Max {MAX_VIDEO_SIZE_MB}MB, up to {MAX_VIDEO_DURATION_MIN} mins)
                    </p>
                  </div>

                  {(videoFile || videoThumbnail) && (
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-black aspect-video max-h-44">
                      <video
                        src={videoFile ? URL.createObjectURL(videoFile) : undefined}
                        poster={videoThumbnail || undefined}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-base shadow-lg transition-all"
                >
                  {loading
                    ? uploadProgress || "Saving..."
                    : media
                    ? "Update Media Post"
                    : type === "image" && selectedImages.length > 1
                    ? `Upload Post (${selectedImages.length} Photos)`
                    : "Upload Media Post"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}