"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Globe, MapPin, Phone, Send } from "lucide-react";

import { useDispatch } from "react-redux";
import { submitContact } from "../../store/slices/formSlice";
import { useContact } from "../../hooks/useContact";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "connectwithafrica@gmail.com",
    href: "mailto:connectwithafrica@gmail.com",
  },
  {
    icon: Globe,
    title: "Website",
    value: "www.connectwithafrica.org",
    href: "https://www.connectwithafrica.org",
  },
  { icon: MapPin, title: "Location", value: "United States", href: null },
];

export default function ContactPage() {
  const dispatch = useDispatch();

  
  const { sendContactMessage, loading } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    type: "general",
  });

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("📋 Form submitted with data:", formData);
  try {
    console.log("🔄 Calling sendContactMessage...");
    const res = await sendContactMessage(formData);
    console.log("✅ API Response received:", res);

    console.log("🎉 Showing success toast...");
    toast.success("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "general",
    });
    console.log("🔄 Form reset");
  } catch (err: any) {
    console.error("❌ Error in handleSubmit:", err);
    const errorMessage = err?.response?.data?.message || err?.message || "An error occurred while sending your message.";
    console.error("📢 Showing error toast with message:", errorMessage);
    toast.error(errorMessage);
  }
};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "connectwithafrica@gmail.com",
      href: "mailto:connectwithafrica@gmail.com",
    },
    {
      icon: Globe,
      title: "Website",
      value: "www.connectwithafrica.org",
      href: "https://www.connectwithafrica.org",
    },
    { icon: MapPin, title: "Location", value: "United States", href: null },
  ];

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden ">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop&q=60"
            alt="Contact hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/85 to-earth/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6"
            >
              Get in Touch
            </motion.span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-earth-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-earth-foreground/80 text-lg leading-relaxed">
              Have questions, want to partner with us, or ready to make a
              difference? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className=" py-20 md:p-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid w-full lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Phone Number</Label>
                    <Input
                       type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      placeholder="+234 XXX XXX XXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Inquiry Type</Label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="donation">Donation Questions</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="corporate">Corporate Giving</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Send className="mr-2 w-5 h-5" />
                     {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you're interested in donating, partnering, or learning
                more about our work, we're here to help. Reach out using any of
                the methods below.
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-primary hover:underline"
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-gold/10 rounded-xl border border-gold/20"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Corporate & In-Kind Donations
                </h3>
                <p className="text-muted-foreground mb-4">
                  If you represent a company, hospital, or distributor and would
                  like to donate supplies or sponsor a container, we welcome
                  your partnership.
                </p>
                <Button
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold/10"
                >
                  Learn About Corporate Giving
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
