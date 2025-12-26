import React from 'react'
import Layout from '@/components/layout/Layout'
import { notFound } from 'next/navigation'

const posts: Record<string, any> = {
  'impact-2024-1': {
    id: 'impact-2024-1',
    title: 'Medical Containers Delivered to Northern Clinics',
    content: `We successfully shipped two medical containers loaded with supplies to partner clinics, enabling essential surgeries and deliveries. Our logistics team coordinated with local partners to ensure customs clearance and in-country distribution.`,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=60',
    author: 'Connect Team',
    date: '2024-03-21',
    tags: ['medical', 'logistics']
  },
  'edu-2024-2': {
    id: 'edu-2024-2',
    title: 'New Classroom Builds Support 500 Students',
    content: `Our school building initiative finished three classrooms, improving learning environments and enabling enrollment growth. With local labor and materials, we kept costs low and empowered the community.`,
    image: 'https://images.unsplash.com/photo-1427504494785-cdcd6c6ff4e4?w=1200&auto=format&fit=crop&q=60',
    author: 'Program Lead',
    date: '2024-06-10',
    tags: ['education']
  },
  'water-2024-3': {
    id: 'water-2024-3',
    title: 'Clean Water Wells Installed in Two Villages',
    content: `We partnered with local leaders to install water filtration and well systems, drastically reducing waterborne illness and improving daily life for families.`,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=60',
    author: 'Field Team',
    date: '2024-08-02',
    tags: ['water', 'community']
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts[params.id]
  if (!post) return notFound()

  return (
    <Layout>
      <article className="py-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg mb-6" />
          <div className="text-xs text-muted-foreground mb-2">{new Date(post.date).toLocaleDateString()} • {post.author}</div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="prose prose-lg max-w-none text-foreground">{post.content}</div>
        </div>
      </article>
    </Layout>
  )
}
