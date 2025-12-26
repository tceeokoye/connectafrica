"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Play } from "lucide-react";
import GalleryMediaModal from "@/components/admin/gallary/create-media-modal";
import { MediaItem } from "@/types/global";
import { toast } from "sonner";
import DeleteGallaryModal from "@/components/admin/gallary/delete-media-modal";
import { set } from "date-fns";
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

  return (
    <>
    <AdminLayout>
      <div className="space-y-6 w-full ">
       
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
              Manage gallery images and videos
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedMedia(undefined);
              setOpen(true);
            }}
          >
            <Plus size={18} /> Upload Media
          </Button>
        </motion.div>

        {loading ? (
          <p className=" h-full flex items-center justify-center w-full py-20 text-center text-muted-foreground">
            Loading gallery...
          </p>
        ) : (
          <>
            <div className=" overflow-hidden sticky -top-[24.28px]  z-40 bg-background/95 px-6 -mx-6  border-b border-border ">
              <section className=" border-b w-full overflow-x-auto border-border ">
                <div className="flex py-6 items-center gap-2 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        filter === cat
                          ? "bg-primary text-primary-foreground"
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
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="relative bg-card rounded-xl overflow-hidden shadow-sm flex flex-col"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.type === "video" ? item.thumbnail : item.src}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />

                      {/* Video overlay always visible */}
                      {item.type === "video" && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                          <Play size={48} className="text-white" />
                        </div>
                      )}

                      {/* Info and actions */}
                      <div className="p-3 flex-1 flex flex-col justify-between relative z-10">
                        <div>
                          <h3 className="text-sm font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent video overlay click
                              setSelectedMedia(item);
                              setOpen(true);
                            }}
                          >
                            <Edit size={16} /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent video overlay click
                              setSelectedMedia(item);
                              setDeleteOpen(true);
                            }}
                          >
                            <Trash2 size={16} /> Delete
                          </Button>
                        </div>
                      </div>

                      {/* Overlay click to open preview */}
                      {item.type === "video" && (
                        <div
                          className="absolute inset-0 cursor-pointer z-0"
                          onClick={() => setPreviewMedia(item)}
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </section>
            )}
          </>
        )}

        {/* Preview Modal */}
        <AnimatePresence>
          {previewMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewMedia(null)}
            >
              <div
                className="relative max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {previewMedia.type === "video" ? (
                  previewMedia.src.includes("youtube.com") ||
                  previewMedia.src.includes("youtu.be") ? (
                    <iframe
                      src={convertYouTubeURL(previewMedia.src)}
                      title={previewMedia.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-96 rounded-lg"
                    />
                  ) : (
                    <video
                      src={previewMedia.src}
                      controls
                      autoPlay
                      className="w-full rounded-lg"
                    />
                  )
                ) : (
                  <img
                    src={previewMedia.src}
                    alt={previewMedia.title}
                    className="w-full rounded-lg"
                  />
                )}

                <button
                  onClick={() => setPreviewMedia(null)}
                  className="absolute top-2 right-2 text-white text-2xl font-bold"
                >
                  ✕
                </button>
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
    </>
  );
}
