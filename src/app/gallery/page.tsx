"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { X, Image as ImageIcon, Sparkles, Calendar } from "lucide-react";
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

/** Extract the 4-digit year from a date string, or return "Older" */
function getYear(dateStr?: string): string {
  if (!dateStr) return "Older";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "Older";
  return String(d.getFullYear());
}

/** Group an array of MediaItems into { [year]: MediaItem[] }, sorted newest year first */
function groupByYear(items: MediaItem[]): { year: string; items: MediaItem[] }[] {
  const map: Record<string, MediaItem[]> = {};
  for (const item of items) {
    const y = getYear(item.createdAt);
    if (!map[y]) map[y] = [];
    map[y].push(item);
  }
  // Sort years descending (newest first), keep "Older" at the bottom
  const years = Object.keys(map).sort((a, b) => {
    if (a === "Older") return 1;
    if (b === "Older") return -1;
    return Number(b) - Number(a);
  });
  return years.map((year) => ({ year, items: map[year] }));
}

export default function GalleryPage() {
  const [previewMedia, setPreviewMedia] = useState<MediaItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeYear, setActiveYear] = useState<string>("all");
  const dispatch = useDispatch();
  const mediaItems = useSelector((state: RootState) => state.gallery.gallery);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const grouped = groupByYear(mediaItems ?? []);
  const years = grouped.map((g) => g.year);

  // When a year tab is clicked, scroll to that section
  const handleYearClick = (year: string) => {
    setActiveYear(year);
    if (year === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = sectionRefs.current[year];
    if (el) {
      const offset = 120; // account for sticky nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

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
      <section className="relative pt-36 pb-28 overflow-hidden bg-green-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg}
            alt="Frontline healthcare facility"
            fill
            className="object-cover object-center opacity-85 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/25 border border-green-400/40 text-green-300 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            GALLERY
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Work in Pictures
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-green-300">
            Medical Supplies Delivered to Frontline Healthcare Facility
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Supporting healthcare professionals with essential resources to better serve their communities.
          </p>
        </div>
      </section>

      {/* ================= YEAR FILTER TABS ================= */}
      {mediaItems && mediaItems.length > 0 && years.length > 0 && (
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
              <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {/* "All" tab */}
              <button
                onClick={() => handleYearClick("all")}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeYear === "all"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                All Years
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    activeYear === year
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-slate-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= GALLERY BY YEAR ================= */}
      <section className="py-16 md:py-24 bg-slate-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
          {mediaItems && mediaItems.length > 0 ? (
            grouped.map(({ year, items }) => (
              <div
                key={year}
                ref={(el) => { sectionRefs.current[year] = el; }}
              >
                {/* Year Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 mb-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900">
                      {year}
                    </h2>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200" />
                </motion.div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item._id || index}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
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

                      {/* Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-emerald-600/90 rounded-full text-xs font-bold text-white shadow">
                          {item.type === "video" ? "📹 Video" : "📷 Photo"}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <p className="font-bold text-sm leading-snug line-clamp-2">
                          {item.title || "Medical supplies delivery"}
                        </p>
                        {item.createdAt && (
                          <p className="text-emerald-300 text-xs mt-1">
                            {new Date(item.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
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
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {previewMedia.title || "Medical Supplies Delivered to Frontline Healthcare Facility"}
                  </h3>
                  {previewMedia.createdAt && (
                    <span className="flex-shrink-0 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {new Date(previewMedia.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
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


