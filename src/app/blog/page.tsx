"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setBlogs } from "@/store/slices/blogSlice";
import { toast } from "sonner";

export default function BlogPage() {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  /** ✅ Fix hydration mismatch */
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/blog/get");
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to fetch blogs");
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

  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => blog.tags?.includes(selectedTag))
    : blogs;

  const allTags = Array.from(new Set(blogs.flatMap((b) => b.tags || [])));

  if (!mounted) return <Layout><section className="py-20 container mx-auto px-4" /></Layout>;

  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">Stories & Updates</h1>
          <p className="text-muted-foreground">
            Recent impact reports, partner stories, and updates from the field.
          </p>
        </motion.div>

        {/* Sticky Tags Filter */}
        {allTags.length > 0 && (
          <div className="sticky top-20 z-40 bg-muted/50 backdrop-blur-md py-4 mb-8 flex flex-wrap justify-center gap-3 rounded-lg shadow-sm">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full ${
                !selectedTag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post, idx) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground mb-2">
                  {new Date(post.createdAt).toLocaleDateString()} • {post.author}
                </div>
                <h3 className="font-semibold text-xl mb-2 text-foreground">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded bg-secondary text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-semibold"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
          {filteredBlogs.length === 0 && !loading && (
            <p className="text-center text-muted-foreground col-span-full">
              No posts found for this filter.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
