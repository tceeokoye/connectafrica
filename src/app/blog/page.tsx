"use client"

import React from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { motion } from 'framer-motion'

const posts = [
  {
    id: 'impact-2024-1',
    title: 'Medical Containers Delivered to Northern Clinics',
    excerpt: 'We successfully shipped two medical containers loaded with supplies to partner clinics, enabling essential surgeries and deliveries.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    author: 'Connect Team',
    date: '2024-03-21',
    tags: ['medical', 'logistics']
  },
  {
    id: 'edu-2024-2',
    title: 'New Classroom Builds Support 500 Students',
    excerpt: 'Our school building initiative finished three classrooms, improving learning environments and enabling enrollment growth.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdcd6c6ff4e4?w=800&auto=format&fit=crop&q=60',
    author: 'Program Lead',
    date: '2024-06-10',
    tags: ['education']
  },
  {
    id: 'water-2024-3',
    title: 'Clean Water Wells Installed in Two Villages',
    excerpt: 'We partnered with local leaders to install water filtration and well systems, drastically reducing waterborne illness.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60',
    author: 'Field Team',
    date: '2024-08-02',
    tags: ['water', 'community']
  }
]

export default function BlogPage() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Stories & Updates</h1>
          <p className="text-muted-foreground">Recent impact reports, partner stories, and updates from the field.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-44 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString()} • {post.author}</div>
                <h3 className="font-semibold text-xl mb-2 text-foreground">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary text-foreground">{tag}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.id}`} className="text-primary font-semibold">Read more →</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
