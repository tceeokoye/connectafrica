"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { X, Play, Image as ImageIcon } from "lucide-react";
import { setGallery } from "@/store/slices/gallerySlice";
import { toast } from "sonner";
import { MediaItem } from "@/types/global";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const categories = [
  "All",
  "Medical",
  "Education",
  "Water",
  "Community",
  "Impact",
  "Videos",
];

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

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const dispatch = useDispatch();
  const mediaItems = useSelector((state: RootState) => state.gallery.gallery);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/v1/admin/gallary/get");
      const data = await res.json();
      if (data.success) {
        dispatch(setGallery(data.media));
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? mediaItems
      : selectedCategory === "Videos"
      ? mediaItems.filter((item) => item.type === "video")
      : mediaItems.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase() && item.type === "image"
        );

  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Visual stories from our work across African communities
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-20 z-30 flex flex-wrap gap-3 justify-center mb-6 bg-background/80 backdrop-blur-sm py-3 px-4 rounded-md shadow-sm"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="col-span-full text-center text-muted-foreground py-20 text-lg font-medium"
              >
                {selectedCategory === "All"
                  ? "No media available at the moment."
                  : `No ${selectedCategory.toLowerCase()} found in the gallery.`}
              </motion.div>
            )}

            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setPreviewMedia(item)}
                className="group relative h-64 overflow-hidden rounded-lg cursor-pointer bg-muted"
              >
                <img
                  src={item.type === "video" ? item.thumbnail : item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  {item.type === "video" ? (
                    <Play size={48} className="text-white" />
                  ) : (
                    <ImageIcon size={48} className="text-white" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setPreviewMedia(null)}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                <X className="w-8 h-8" />
              </button>

              {previewMedia.type === "video" ? (
                previewMedia.src.includes("youtube") ? (
                  <iframe
                    src={convertYouTubeURL(previewMedia.src)}
                    className="w-full h-96 rounded-lg"
                    allowFullScreen
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

              <div className="mt-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{previewMedia.title}</h2>
                {/* <p className="text-gray-200">{previewMedia.description}</p> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
