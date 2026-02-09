"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setBlogs } from "@/store/slices/blogSlice";
import { toast } from "sonner";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export default function BlogPage() {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/blog/get");
      const data = await res.json();
      if (!data.success)
        throw new Error(data.message || "Failed to fetch blogs");
      dispatch(setBlogs(data.blogs));
    } catch (err: any) {
      toast.error(err.message || "Failed to load blogs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTag = !selectedTag || blog.tags?.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags || [])));
  const featuredPost = blogs[0];

  if (!mounted)
    return (
      <Layout>
        <section className="py-20 container mx-auto px-4" />
      </Layout>
    );

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
              Resources & Stories
            </motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Impact Stories & Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover real stories from the field, research insights, and updates on how we're creating sustainable change 
              across African communities.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search & Filter */}
          <div className="space-y-6">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </motion.div>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all ${
                    !selectedTag
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Articles
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2 rounded-full font-semibold transition-all ${
                      selectedTag === tag
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ================= FEATURED POST ================= */}
      {featuredPost && !searchQuery && !selectedTag && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-80 lg:h-full overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100">
                  {featuredPost.image && (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-10 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full mb-4 w-fit">
                    Featured
                  </span>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-3">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-6 mb-8 text-sm text-gray-600 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                  </div>

                  <div className="flex gap-3 mb-6">
                    {featuredPost.tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= BLOG GRID ================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 max-w-2xl mx-auto"
            >
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-gray-600 mb-6">
                {searchQuery 
                  ? `No articles found matching "${searchQuery}"`
                  : "No articles in this category yet"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTag}-${searchQuery}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {filteredBlogs.map((post) => (
                  <motion.article
                    key={post._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-emerald-100 to-blue-100">
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-gray-100">
                        {post.tags?.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Get Stories Delivered
            </h3>
            <p className="text-emerald-50 text-lg mb-8">
              Subscribe to our newsletter for monthly impact updates and stories from the field.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
