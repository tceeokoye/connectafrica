"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { X, Play, Image as ImageIcon, Sparkles } from "lucide-react";
import { setGallery } from "@/store/slices/gallerySlice";
import { MediaItem } from "@/types/global";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import heroBg from "@/assets/inside-clinic.jpeg";

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
      }
    } catch (err: any) {
      console.log("Gallery load info:", err.message);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (!mounted) {
    return (
      <Layout>
        <section className="py-20 container mx-auto px-4" />
      </Layout>
    );
  }

  return (
    <Layout className="overflow-x-hidden">
      {/* ================= HERO WITH BACKGROUND IMAGE ================= */}
      <section className="relative pt-36 pb-28 overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Frontline healthcare facility"
            fill
            className="object-cover object-center opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-emerald-950/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            GALLERY
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Work in Pictures
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-300">
            Medical Supplies Delivered to Frontline Healthcare Facility
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Supporting healthcare professionals with essential resources to better serve their communities.
          </p>
        </div>
      </section>

      {/* ================= GALLERY GRID ================= */}
      <section className="py-20 md:py-28 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {mediaItems && mediaItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setPreviewMedia(item)}
                  className="group relative h-72 overflow-hidden rounded-3xl cursor-pointer bg-slate-200 shadow-md hover:shadow-2xl transition-all"
                >
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={item.title || "Frontline healthcare delivery"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-emerald-600/90 rounded-full text-xs font-bold text-white shadow">
                      {item.type === "video" ? "📹 Video" : "📷 Photo"}
                    </span>
                  </div>

                  {/* Title / Description */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-bold text-sm leading-snug line-clamp-2">
                      {item.title || "Medical supplies delivery"}
                    </p>
                    <p className="text-emerald-300 text-xs mt-1 line-clamp-1">
                      Supporting frontline healthcare
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Medical Supplies Delivered to Frontline Healthcare Facility
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Supporting healthcare professionals with essential resources to better serve their communities. Pictures and documentary footage from our recent distributions will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= PREVIEW MODAL ================= */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMedia(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden"
            >
              <button
                onClick={() => setPreviewMedia(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              {previewMedia.type === "video" ? (
                <div className="relative w-full pt-[56.25%] bg-black">
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
                  className="w-full max-h-[70vh] object-contain bg-slate-950"
                />
              )}

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {previewMedia.title || "Medical Supplies Delivered to Frontline Healthcare Facility"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {previewMedia.description || "Supporting healthcare professionals with essential resources to better serve their communities."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
