"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { X, Play, Image as ImageIcon, Filter } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const mediaItems = useSelector((state: RootState) => state.gallery.gallery);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase() &&
            item.type === "image"
        );

  if (!mounted) {
    return (
      <Layout>
        <section className="py-20 container mx-auto px-4" />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-sm font-semibold mb-6"
            >
              Visual Impact Stories
            </motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Work in Action
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See the real impact of your support through photos and videos from communities and healthcare facilities 
              across Africa where we're making a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 flex flex-wrap gap-3 justify-center"
          >
            <div className="flex items-center gap-3 mb-4 w-full justify-center text-sm text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-semibold">Filter by category:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">📷</div>
                <p className="text-xl text-gray-600 mb-4">
                  {selectedCategory === "All"
                    ? "No media available at the moment."
                    : `No ${selectedCategory.toLowerCase()} content found.`}
                </p>
                <p className="text-gray-500">Check back soon for new updates!</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setPreviewMedia(item)}
                    className="group relative h-64 overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br from-emerald-100 to-blue-100 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail : item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="flex items-center justify-center"
                      >
                        {item.type === "video" ? (
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40">
                            <Play size={28} className="text-white fill-white" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40">
                            <ImageIcon size={28} className="text-white" />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-gray-900 text-xs font-bold rounded-full backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-semibold line-clamp-2">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          {filteredItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-16 border-t border-gray-200 text-center"
            >
              <p className="text-gray-600">
                Showing <span className="font-bold text-emerald-600">{filteredItems.length}</span> of <span className="font-bold text-emerald-600">{mediaItems.length}</span> items
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= PREVIEW MODAL ================= */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPreviewMedia(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-all"
              >
                <X className="w-6 h-6 text-gray-900" />
              </motion.button>

              {/* Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                {previewMedia.type === "video" ? (
                  <div className="bg-black">
                    {previewMedia.src.includes("youtube") ? (
                      <iframe
                        src={convertYouTubeURL(previewMedia.src)}
                        className="w-full aspect-video"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={previewMedia.src}
                        controls
                        autoPlay
                        className="w-full aspect-video"
                      />
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-[500px]">
                    <img
                      src={previewMedia.src}
                      alt={previewMedia.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Info */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                      {previewMedia.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {previewMedia.type === "video" ? "📹 Video" : "📷 Photo"}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {previewMedia.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
