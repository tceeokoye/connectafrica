"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { X } from 'lucide-react'

const galleryImages = [
  {
    id: 1,
    title: 'Medical Supplies Distribution',
    description: 'Healthcare workers receiving medical containers at partner clinic',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    category: 'medical'
  },
  {
    id: 2,
    title: 'School Children Learning',
    description: 'Students in newly built classroom receiving education',
    src: 'https://images.unsplash.com/photo-1427504494785-cdcd6c6ff4e4?w=800&auto=format&fit=crop&q=60',
    category: 'education'
  },
  {
    id: 3,
    title: 'Clean Water Initiative',
    description: 'Community members accessing newly installed water well',
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60',
    category: 'water'
  },
  {
    id: 4,
    title: 'Community Health Clinic',
    description: 'Healthcare professionals serving patients at community center',
    src: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60',
    category: 'medical'
  },
  {
    id: 5,
    title: 'Medical Equipment Setup',
    description: 'Installing diagnostic equipment for healthcare centers',
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
    category: 'medical'
  },
  {
    id: 6,
    title: 'Community Building Project',
    description: 'Local team members working on infrastructure development',
    src: 'https://images.unsplash.com/photo-1517457373614-b7152f800bb1?w=800&auto=format&fit=crop&q=60',
    category: 'community'
  },
  {
    id: 7,
    title: 'Healthcare Training',
    description: 'Medical professionals conducting training sessions',
    src: 'https://images.unsplash.com/photo-1517946913291-d28a51d83c68?w=800&auto=format&fit=crop&q=60',
    category: 'medical'
  },
  {
    id: 8,
    title: 'Impact Stories',
    description: 'Beneficiaries sharing their experience with our programs',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
    category: 'impact'
  },
  {
    id: 9,
    title: 'School Graduation',
    description: 'Students celebrating educational achievement',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60',
    category: 'education'
  }
]

const categories = ['all', 'medical', 'education', 'water', 'community', 'impact']

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory)

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
          <p className="text-lg text-muted-foreground">Visual stories from our work across African communities</p>
        </motion.div>

        {/* Category Filter (sticky) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-20 z-30 flex flex-wrap gap-3 justify-center mb-6 bg-background/80 backdrop-blur-sm py-3 px-4 rounded-md shadow-sm"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="group relative h-64 overflow-hidden rounded-lg cursor-pointer bg-muted"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white font-bold text-sm">{image.title}</h3>
                <p className="text-white/80 text-xs mt-1">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No images found in this category</p>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-gray-200">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  )
}
