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
      <section className="relative pt-40 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900/60 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" 
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-5xl">
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
              className="inline-block px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-sm font-semibold mb-8"
            >
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Visual Impact Stories
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Our Work in Action
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See the transformative impact of our initiatives through photos and videos from communities and healthcare facilities across Africa where we're making a real difference in people's lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-gray-900 text-lg">Filter Gallery</span>
              </div>
              <span className="text-sm text-gray-500">{filteredItems.length} items</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all transform ${
                    selectedCategory === category
                      ? "bg-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center py-32"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-6 inline-block"
                >
                  📷
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">No Content Available</h3>
                <p className="text-lg text-gray-600 mb-2">
                  {selectedCategory === "All"
                    ? "No media items have been added to the gallery yet."
                    : `No ${selectedCategory.toLowerCase()} content found in our collection.`}
                </p>
                <p className="text-gray-500">Check back soon for new updates from our work across Africa.</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -12 }}
                    onClick={() => setPreviewMedia(item)}
                    className="group relative h-72 overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br from-emerald-50 to-blue-50 shadow-md hover:shadow-2xl transition-all"
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail : item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play/Image icon - centered */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {item.type === "video" ? (
                        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/60 hover:bg-white/50 transition-all">
                          <Play size={32} className="text-white fill-white ml-1" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border-2 border-white/60 hover:bg-white/50 transition-all">
                          <ImageIcon size={32} className="text-white" />
                        </div>
                      )}
                    </motion.div>

                    {/* Category and Type badges */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                        {item.type === "video" ? "📹 Video" : "📷 Photo"}
                      </span>
                    </div>
                    
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-emerald-600 shadow-lg">
                        {item.category}
                      </span>
                    </div>

                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <p className="text-white font-bold text-sm line-clamp-2">{item.title}</p>
                      {item.description && (
                        <p className="text-gray-200 text-xs line-clamp-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= MEDIA PREVIEW MODAL ================= */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full"
            >
              <button
                onClick={() => setPreviewMedia(null)}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              {previewMedia.type === "video" ? (
                <div className="relative w-full pt-[56.25%] bg-black rounded-3xl overflow-hidden">
                  <iframe
                    src={convertYouTubeURL(previewMedia.src)}
                    title={previewMedia.title}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={previewMedia.src}
                  alt={previewMedia.title}
                  className="w-full h-auto rounded-3xl"
                />
              )}

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{previewMedia.title}</h2>
                    <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {previewMedia.category}
                    </span>
                  </div>
                </div>
                {previewMedia.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">{previewMedia.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
