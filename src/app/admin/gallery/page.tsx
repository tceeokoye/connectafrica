"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Play, Layers, ChevronLeft, ChevronRight, X } from "lucide-react";
import GalleryMediaModal from "@/components/admin/gallary/create-media-modal";
import { MediaItem } from "@/types/global";
import { toast } from "sonner";
import DeleteGallaryModal from "@/components/admin/gallary/delete-media-modal";
import AdminLayout from "@/components/AdminLayout";

// Categories for filtering
const categories = [
  "All",
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
  "Videos",
];

// Helper function to convert YouTube URLs to embed links
function convertYouTubeURL(url: string) {
  let videoId = "";
  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("youtube.com/watch")) {
    const params = new URLSearchParams(url.split("?")[1]);
    videoId = params.get("v") || "";
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

export default function AdminGallery() {
  const [open, setOpen] = useState(false); // edit/upload modal
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | undefined>();
  const [filter, setFilter] = useState("All");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null); // preview modal
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [deleteOpen, setDeleteOpen] = useState(false); // delete modal
  const [loading, setLoading] = useState(false);

  // Fetch gallery items from API
  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/gallary/get");
      const data = await res.json();
      if (data.success) {
        setMediaItems(data.media);
        setLoading(false);
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch gallery");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems =
    filter === "All"
      ? mediaItems
      : filter === "Videos"
      ? mediaItems.filter((item) => item.type === "video")
      : mediaItems.filter((item) => item.category === filter);

  const previewImages = previewMedia
    ? previewMedia.images && previewMedia.images.length > 0
      ? previewMedia.images
      : previewMedia.src
      ? [previewMedia.src]
      : []
    : [];

  const handleOpenPreview = (item: MediaItem) => {
    setPreviewMedia(item);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (previewImages.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % previewImages.length);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (previewImages.length > 1) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? previewImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
            <p className="text-muted-foreground">
              Manage gallery images, carousels, and videos
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedMedia(undefined);
              setOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            <Plus size={18} /> Upload Media / Carousel
          </Button>
        </motion.div>

        {loading ? (
          <p className="h-full flex items-center justify-center w-full py-20 text-center text-muted-foreground">
            Loading gallery...
          </p>
        ) : (
          <>
            <div className="overflow-hidden sticky -top-[24.28px] z-40 bg-background/95 backdrop-blur-sm px-6 -mx-6 border-b border-border">
              <section className="border-b w-full overflow-x-auto border-border">
                <div className="flex py-4 items-center gap-2 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        filter === cat
                          ? "bg-primary text-primary-foreground font-bold shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {filteredItems.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                No media found in this category.
              </div>
            ) : (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => {
                    const hasMultiImages =
                      item.type === "image" &&
                      item.images &&
                      item.images.length > 1;
                    const photoCount =
                      item.images && item.images.length > 0
                        ? item.images.length
                        : 1;

                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm flex flex-col group hover:shadow-md transition-shadow"
                      >
                        {/* Thumbnail clickable area */}
                        <div
                          className="relative h-48 cursor-pointer overflow-hidden bg-slate-900"
                          onClick={() => handleOpenPreview(item)}
                        >
                          <img
                            src={
                              item.type === "video"
                                ? item.thumbnail
                                : item.src || (item.images && item.images[0])
                            }
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Video overlay icon */}
                          {item.type === "video" && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                              <Play size={44} className="text-white" />
                            </div>
                          )}

                          {/* Multi-Photo Indicator Badge */}
                          {hasMultiImages && (
                            <div className="absolute top-2 right-2 z-10">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                                <Layers className="w-3 h-3 text-emerald-400" />
                                <span>{photoCount} photos</span>
                              </span>
                            </div>
                          )}

                          <div className="absolute top-2 left-2 z-10">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold">
                              {item.type === "video" ? "Video" : "Photo"}
                            </span>
                          </div>
                        </div>

                        {/* Info and actions */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-foreground line-clamp-1">
                              {item.title}
                            </h3>
                            <div className="flex items-center justify-between mt-1.5">
                              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {item.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-muted text-foreground border border-border/50">
                                📅 {item.year || (item.createdAt ? new Date(item.createdAt).getFullYear() : "—")}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-3 border-t border-border/60">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 rounded-xl text-xs font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMedia(item);
                                setOpen(true);
                              }}
                            >
                              <Edit size={14} className="mr-1" /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="rounded-xl text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMedia(item);
                                setDeleteOpen(true);
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </section>
            )}
          </>
        )}

        {/* Preview Modal with Carousel (FB/IG Style) */}
        <AnimatePresence>
          {previewMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewMedia(null)}
            >
              <div
                className="relative max-w-3xl w-full bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-white/20"
                >
                  <X size={18} />
                </button>

                <div className="relative bg-black flex items-center justify-center min-h-[350px] max-h-[60vh] select-none">
                  {previewMedia.type === "video" ? (
                    previewMedia.src.includes("youtube.com") ||
                    previewMedia.src.includes("youtu.be") ? (
                      <iframe
                        src={convertYouTubeURL(previewMedia.src)}
                        title={previewMedia.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-96"
                      />
                    ) : (
                      <video
                        src={previewMedia.src}
                        controls
                        autoPlay
                        className="w-full max-h-[60vh] object-contain"
                      />
                    )
                  ) : (
                    <>
                      <img
                        src={previewImages[currentPhotoIndex]}
                        alt={previewMedia.title}
                        className="w-full max-h-[60vh] object-contain"
                      />

                      {/* Multi-Photo Carousel Controls */}
                      {previewImages.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevPhoto}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 shadow-lg"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={handleNextPhoto}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 shadow-lg"
                          >
                            <ChevronRight size={20} />
                          </button>

                          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/65 text-white text-xs font-bold border border-white/20">
                            {currentPhotoIndex + 1} / {previewImages.length}
                          </div>

                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-white/10">
                            {previewImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentPhotoIndex(idx);
                                }}
                                className={`rounded-full transition-all ${
                                  idx === currentPhotoIndex
                                    ? "w-5 h-1.5 bg-emerald-400"
                                    : "w-1.5 h-1.5 bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div className="p-5 bg-card">
                  <h3 className="text-lg font-bold text-foreground">
                    {previewMedia.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-muted font-semibold">
                      {previewMedia.category}
                    </span>
                    {previewImages.length > 1 && (
                      <span>• {previewImages.length} photos in post</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <DeleteGallaryModal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          mediaId={selectedMedia?._id}
          setMediaItems={setMediaItems}
        />

        {/* Edit/Upload Modal */}
        <GalleryMediaModal
          isOpen={open}
          onClose={() => setOpen(false)}
          media={selectedMedia}
          onSave={fetchGallery}
        />
      </div>
      </AdminLayout>
  );
}
