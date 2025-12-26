"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { Button } from '../../components/ui/button'
import { Heart, Target, Eye, Users, Globe, ArrowRight } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Compassion', description: 'Every action we take is driven by genuine care for the communities we serve.' },
  { icon: Target, title: 'Impact', description: 'We focus on measurable outcomes that make a real difference in people\'s lives.' },
  { icon: Users, title: 'Partnership', description: 'We work alongside local leaders and communities, not above them.' },
  { icon: Globe, title: 'Transparency', description: 'We maintain open communication with our donors and partners about how resources are used.' }
]

const timeline = [
  { year: '2020', title: 'Foundation', description: 'Connect with Africa was founded with a vision to bridge global generosity with local needs.' },
  { year: '2021', title: 'First Container', description: 'Shipped our first container of medical supplies to healthcare centers in Nigeria.' },
  { year: '2022', title: 'Expanding Reach', description: 'Established partnerships with 10+ primary healthcare centers across Northern Nigeria.' },
  { year: '2023', title: 'Growing Impact', description: 'Launched the Medical Container Campaign to deliver two containers of essential supplies.' }
]

export default function About() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&auto=format&fit=crop&q=60" alt="About hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/85 to-earth/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6">Our Story</motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-earth-foreground mb-6">About Connect with Africa</h1>
            <p className="text-earth-foreground/80 text-lg leading-relaxed">We are a humanitarian initiative dedicated to bridging global generosity with local needs across African communities.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"><Target className="w-8 h-8 text-primary" /></div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">To equip those who serve on the frontlines of healthcare in Africa so they can save lives with dignity.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-accent/5 p-8 rounded-2xl border border-accent/20">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6"><Eye className="w-8 h-8 text-accent" /></div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">A world where every healthcare facility in Africa has the basic supplies and equipment needed to provide quality care.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">These core values guide everything we do and every decision we make.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="bg-card p-6 rounded-xl shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"><value.icon className="w-7 h-7 text-primary" /></div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">{item.year}</div>
                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-gold/20 to-accent/20 rounded-2xl blur-xl" />
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600" alt="Founder" className="relative rounded-2xl w-full h-[500px] object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">Leadership</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Meet Our Founder</h2>
              <p className="text-muted-foreground leading-relaxed mb-6"><span className="font-semibold text-foreground">Cajetan Onu, JD</span>, is the Founder and Executive Director of Connect with Africa.</p>

              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90">Get in Touch <ArrowRight className="ml-2 w-5 h-5" /></Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">Whether through donations, partnerships, or spreading the word, your support helps us continue our mission.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donate"><Button size="lg" className="bg-earth-foreground text-earth hover:bg-earth-foreground/90">Donate Now</Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Contact Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
