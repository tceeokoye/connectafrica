"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { Button } from '../../components/ui/button'
import { ArrowRight, TrendingUp } from 'lucide-react'

const campaigns = [
  {
    id: 'medical-container',
    title: 'Medical Container Campaign',
    description: 'Equipping African healthcare centers with essential medical supplies and equipment to save lives.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60',
    raised: 32500,
    goal: 50000,
    progress: 65,
    donors: 128,
    status: 'active'
  },
  {
    id: 'education',
    title: 'School Building Initiative',
    description: 'Building schools and providing learning materials to unlock potential of African youth.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdcd6c6ff4e4?w=800&auto=format&fit=crop&q=60',
    raised: 18750,
    goal: 40000,
    progress: 47,
    donors: 87,
    status: 'active'
  },
  {
    id: 'clean-water',
    title: 'Clean Water Projects',
    description: 'Installing wells and water purification systems for safe drinking water access.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=60',
    raised: 24200,
    goal: 35000,
    progress: 69,
    donors: 156,
    status: 'active'
  },
  {
    id: 'community-development',
    title: 'Community Development',
    description: 'Supporting sustainable community projects from housing to agricultural initiatives.',
    image: 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=60',
    raised: 15600,
    goal: 30000,
    progress: 52,
    donors: 94,
    status: 'active'
  },
]

export default function CampaignsPage() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Active Campaigns</h1>
          <p className="text-lg text-muted-foreground">Support our ongoing initiatives to make a real difference in African communities.</p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.article
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Campaign Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    {campaign.status === 'active' ? 'Active' : 'Ended'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-foreground">{campaign.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{campaign.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-foreground">Fundraising Progress</span>
                    <span className="text-sm font-bold text-primary">{campaign.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${campaign.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-gold rounded-full"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div>
                    <div className="text-2xl font-bold text-primary">${(campaign.raised / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-muted-foreground">Raised</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">${(campaign.goal / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">Goal</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 border-b border-border">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span><strong>{campaign.donors}</strong> donors supporting this campaign</span>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  Contribute Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
