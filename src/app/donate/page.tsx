"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../../components/layout/Layout'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Heart, Shield, Package, Baby, Building, Check } from 'lucide-react'
import { useToast } from '../../hooks/use-toast'

const donationAmounts = [
  { amount: 25, title: 'Protect a Ward', description: 'Provides gloves and basic PPE for frontline nurses.', icon: Shield },
  { amount: 50, title: 'Equip a Delivery Room', description: 'Helps supply sterile items for safe childbirth.', icon: Baby },
  { amount: 100, title: 'Supply a Clinic', description: 'Contributes to wound care, infection-control materials, and diagnostic tools.', icon: Package },
  { amount: 250, title: 'Support a Container', description: 'Helps cover shipping, logistics, and bulk purchase of supplies.', icon: Building }
]

export default function DonatePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time'|'monthly'>('one-time')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', designation: 'where-most-needed' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email) {
      toast({ title: 'Error', description: 'Please fill in name and email', variant: 'destructive' })
      return
    }

    const amount = Number(customAmount || String(selectedAmount || 0))
    if (amount <= 0) {
      toast({ title: 'Error', description: 'Please select or enter a valid amount', variant: 'destructive' })
      return
    }

    if (amount < 10) {
      toast({ title: 'Error', description: 'Minimum donation amount is ₦10', variant: 'destructive' })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/v1/user/donations/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          amount,
          donationType,
          designation: formData.designation,
        }),
      })

      const data = await response.json()
      
      if (data.success && data.checkoutUrl && data.reference) {
        // Save donation reference to localStorage
        localStorage.setItem('donation_reference', JSON.stringify({
          reference: data.reference,
          timestamp: Date.now(),
          amount,
          email: formData.email,
        }))
        
        toast({ 
          title: 'Redirecting to payment...', 
          description: `Processing your ${donationType} donation of ₦${amount.toLocaleString()}` 
        })
        // Redirect to Monnify checkout
        setTimeout(() => {
          window.location.href = data.checkoutUrl
        }, 1500)
      } else {
        toast({ 
          title: 'Error', 
          description: data.message || 'Failed to process donation',
          variant: 'destructive'
        })
      }
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error?.message || 'Failed to process donation',
        variant: 'destructive'
      })
      console.error('Donation error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className='overflow-x-hidden'>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&auto=format&fit=crop&q=60" alt="Donate hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-emerald-900/60 to-black/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center text-white">
            <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-2 bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4 inline mr-2" />
              Make a Life-Changing Gift
            </motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Your Donation Delivers Hope</h1>
            <p className="text-lg text-emerald-50 max-w-2xl mx-auto">
              Every gift directly supports the delivery of essential medical supplies and resources to underserved clinics across Africa. 
              When you donate, you give nurses, doctors, and midwives the tools they need to save lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center text-sm">
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              <p className="text-gray-700"><strong>100% Secure</strong> SSL encrypted transactions</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Check className="w-6 h-6 text-emerald-600" />
              <p className="text-gray-700"><strong>Tax Deductible</strong> Registered 501(c)(3)</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 text-emerald-600" />
              <p className="text-gray-700"><strong>Verified Impact</strong> Track your donation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Amounts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Your Impact</h2>
            <p className="text-lg text-gray-600">Choose a preset amount or enter a custom donation. See exactly how your gift creates change.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            {donationAmounts.map((item, index) => (
              <motion.div 
                key={item.amount} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.1 }} 
                whileHover={{ y: -8 }} 
                onClick={() => { setSelectedAmount(item.amount); setCustomAmount('') }} 
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedAmount === item.amount && !customAmount 
                    ? 'border-emerald-600 bg-emerald-50 shadow-lg' 
                    : 'border-gray-200 hover:border-emerald-400 bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  {selectedAmount === item.amount && !customAmount && (
                    <Check className="w-6 h-6 text-emerald-600" />
                  )}
                </div>
                <div className="font-display text-3xl font-bold text-gray-900 mb-2">₦{item.amount}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-md mx-auto mb-12">
            <Label htmlFor="custom-amount" className="text-gray-700 font-semibold mb-3 block">Or enter a custom amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">₦</span>
              <Input 
                id="custom-amount" 
                type="number" 
                placeholder="Enter your amount" 
                value={customAmount} 
                onChange={(e:any)=>{ setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="pl-10 py-3 text-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </motion.div>

          {/* Donation Type */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <Button 
              variant={donationType === 'one-time' ? 'default' : 'outline'} 
              onClick={()=>setDonationType('one-time')} 
              className={`px-8 py-3 font-semibold ${
                donationType === 'one-time' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              One-Time Gift
            </Button>
            <Button 
              variant={donationType === 'monthly' ? 'default' : 'outline'} 
              onClick={()=>setDonationType('monthly')} 
              className={`px-8 py-3 font-semibold ${
                donationType === 'monthly' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              Monthly Partner
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.form 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            onSubmit={handleSubmit} 
            className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200"
          >
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-8">Complete Your Donation</h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">Name / Organization</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={(e:any)=>setFormData({...formData, name: e.target.value})} 
                  placeholder="Your name or organization" 
                  required 
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e:any)=>setFormData({...formData, email: e.target.value})} 
                  placeholder="your@email.com" 
                  required 
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">Phone Number (Optional)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={(e:any)=>setFormData({...formData, phone: e.target.value})} 
                  placeholder="Your phone number" 
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 py-3"
                />
              </div>

              <div>
                <Label htmlFor="designation" className="text-gray-700 font-semibold mb-2 block">Support Where Needed Most</Label>
                <select 
                  id="designation" 
                  value={formData.designation} 
                  onChange={(e:any)=>setFormData({...formData, designation: e.target.value})} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                >
                  <option value="where-most-needed">Where Our Work Needs It Most</option>
                  <option value="medical-container">Medical Container Campaign</option>
                </select>
              </div>

              <motion.div whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r px-2 from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 text-lg mt-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline mr-2"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2  hidden md:inline"/>
                      Complete Donation – ₦{(Number(customAmount || selectedAmount || 0)).toLocaleString()}
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-xs text-gray-600 text-center">
                Your payment is secure and encrypted. You'll receive a tax receipt via email. For questions, contact support@connectwithafrica.org
              </p>
            </div>
          </motion.form>

          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            className="text-center text-gray-700 mt-10 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            <strong>"Your generosity doesn't just fund supplies—it sends a message to frontline healthcare workers 
            that the world sees them, cares about them, and will support their mission to deliver quality care."</strong>
          </motion.p>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="max-w-4xl mx-auto"
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              Complete Transparency: Where Your Donation Goes
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border-2 border-emerald-500 shadow-lg"
              >
                <div className="font-display text-5xl font-bold text-emerald-600 mb-3">86%</div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Direct Program Impact</h4>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Medical supplies, equipment, shipping costs, logistics, warehousing, and on-ground distribution to clinics. 
                  This is where the actual change happens.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }} 
                className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-500 shadow-lg"
              >
                <div className="font-display text-5xl font-bold text-blue-600 mb-3">14%</div>
                <h4 className="font-bold text-lg text-gray-900 mb-3">Operations & Accountability</h4>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Administration, staff, impact reporting, donor communication, compliance, and audit costs. 
                  Essential for trustworthy operations.
                </p>
              </motion.div>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
              <h4 className="font-bold text-gray-900 mb-6">Our Commitment to Transparency</h4>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Annual Audits:</strong> Independent third-party audits of all financials</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Impact Tracking:</strong> Each donation tracked with delivery receipts</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Public Reports:</strong> Detailed financial & impact reports published quarterly</span>
                </li>
                <li className="flex gap-3">
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Direct Contact:</strong> Email support@connectwithafrica.org to verify any information</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Donors Trust Us
            </h3>
            <p className="text-gray-700 mb-12 leading-relaxed">
              Join thousands of donors who see their gifts create measurable impact. Every month, you can track 
              deliveries, read stories from clinics, and see how your contribution saved lives.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 text-lg rounded-lg font-semibold w-full md:w-fit">
                View Recent Impact Stories →
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
