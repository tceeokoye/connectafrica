"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Heart, Shield, Package, Baby, Building, Check } from 'lucide-react'
import { useToast } from '../../hooks/use-toast'
import { useDispatch } from 'react-redux'
import { submitDonation } from '../../store/slices/formSlice'

const donationAmounts = [
  { amount: 25, title: 'Protect a Ward', description: 'Provides gloves and basic PPE for frontline nurses.', icon: Shield },
  { amount: 50, title: 'Equip a Delivery Room', description: 'Helps supply sterile items for safe childbirth.', icon: Baby },
  { amount: 100, title: 'Supply a Clinic', description: 'Contributes to wound care, infection-control materials, and diagnostic tools.', icon: Package },
  { amount: 250, title: 'Support a Container', description: 'Helps cover shipping, logistics, and bulk purchase of supplies.', icon: Building }
]

export default function DonatePage() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time'|'monthly'>('one-time')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', designation: 'where-most-needed' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number(customAmount || String(selectedAmount || 0))
    dispatch(submitDonation({ donor: formData.name || 'Anonymous', amount, projectId: formData.designation === 'medical-container' ? 'medical' : undefined }))
    toast({ title: 'Thank you for your generosity!', description: `Your ${donationType} donation of $${amount} will help save lives.` })
  }

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=60" alt="Donate hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/85 to-earth/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6"><Heart className="w-4 h-4 inline mr-2" />Support Our Mission</motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-earth-foreground mb-6">Donate to Connect with Africa</h1>
            <p className="text-earth-foreground/80 text-lg">Your contribution directly supports the shipment of medical supplies and critical resources to clinics that are currently operating with almost nothing.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Every Gift Becomes a Lifeline</h2>
            <p className="text-muted-foreground">Together, we can give nurses, midwives, and doctors the tools they need to serve their communities safely and effectively.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {donationAmounts.map((item, index) => (
              <motion.div key={item.amount} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} onClick={() => { setSelectedAmount(item.amount); setCustomAmount('') }} className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedAmount === item.amount && !customAmount ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><item.icon className="w-6 h-6 text-primary" /></div>
                  {selectedAmount === item.amount && !customAmount && <Check className="w-5 h-5 text-primary" />}
                </div>
                <div className="font-display text-2xl font-bold text-foreground mb-2">${item.amount}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto mb-12">
            <Label htmlFor="custom-amount" className="text-foreground mb-2 block">Or enter a custom amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input id="custom-amount" type="number" placeholder="Enter amount" value={customAmount} onChange={(e:any)=>{ setCustomAmount(e.target.value); setSelectedAmount(null); }} className="pl-8" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex justify-center gap-4 mb-12">
            <Button variant={donationType === 'one-time' ? 'default' : 'outline'} onClick={()=>setDonationType('one-time')} className="px-8">One-Time Gift</Button>
            <Button variant={donationType === 'monthly' ? 'default' : 'outline'} onClick={()=>setDonationType('monthly')} className="px-8">Monthly Partner</Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="max-w-xl mx-auto bg-card p-8 rounded-2xl shadow-lg">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">Complete Your Donation</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name / Organization</Label>
                <Input id="name" value={formData.name} onChange={(e:any)=>setFormData({...formData, name: e.target.value})} placeholder="Your name" required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e:any)=>setFormData({...formData, email: e.target.value})} placeholder="your@email.com" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e:any)=>setFormData({...formData, phone: e.target.value})} placeholder="Your phone number" />
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <select id="designation" value={formData.designation} onChange={(e:any)=>setFormData({...formData, designation: e.target.value})} className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground">
                  <option value="where-most-needed">Where Most Needed</option>
                  <option value="medical-container">Medical Container Campaign</option>
                </select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">Complete Donation – ${customAmount || selectedAmount}</Button>
              </motion.div>
            </div>
          </motion.form>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">Thank you for standing with frontline healthcare workers and the communities they serve. Your generosity travels farther than you can imagine.</motion.p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">Where Your Donation Goes</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                <div className="font-display text-3xl font-bold text-primary mb-2">85%</div>
                <h4 className="font-semibold text-foreground mb-2">Program & Supplies</h4>
                <p className="text-muted-foreground text-sm">Directly funds medical supplies, shipping, logistics, and on-ground distribution.</p>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-accent/5 rounded-xl border border-accent/20">
                <div className="font-display text-3xl font-bold text-accent mb-2">15%</div>
                <h4 className="font-semibold text-foreground mb-2">Administration & Outreach</h4>
                <p className="text-muted-foreground text-sm">Ensures coordination, reporting, accountability, and donor communication.</p>
              </motion.div>
            </div>

            <p className="text-center text-muted-foreground mt-6 text-sm">We are committed to transparency and responsible stewardship of every gift.</p>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
