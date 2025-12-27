"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Calendar, User, Clock } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const post = blogs.find((b) => b.slug === params.slug);

  if (!post) return notFound();

  return (
    <Layout>
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-2">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={16} />
                <span>{post.author}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg prose-foreground max-w-none mx-auto">
            <p className="mb-6">{post.excerpt}</p>
            {post.content.split("\n").map((para, i) => (
              <p key={i} className="mb-6">
                {para}
              </p>
            ))}
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
