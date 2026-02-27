"use client";

import { motion } from "framer-motion";
import { DollarSign, Package, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const waysToHelp = [
  {
    icon: DollarSign,
    title: "Give Financially",
    description:
      "Help cover the cost of supplies, shipping, and distribution to clinics in need.",
    cta: "Make a Donation",
    href: "/donate",
    color: "primary",
  },
  {
    icon: Package,
    title: "Donate Supplies",
    description:
      "Partner with us as a company, hospital, or supplier to contribute medical items and equipment.",
    cta: "Partner As a Supplier",
    href: "/contact",
    color: "accent",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description:
      "Share our mission with friends, colleagues, and organizations that may be able to help.",
    cta: "Share Our Story",
    href: "/about",
    color: "terracotta",
  },
];

export const WaysToHelpSection = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Get Involved
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ways You Can Help
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every contribution, whether financial, material, or simply spreading awareness, 
            brings us closer to our goal of serving those in need.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {waysToHelp.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl flex flex-col transition-all"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-white/10 to-white/5"
                style={{
                  color: `hsl(var(--${item.color}))`,
                }}
              >
                <item.icon className="w-8 h-8" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                {item.description}
              </p>

              {/* CTA Button */}
              <Button
                onClick={() => router.push(item.href)}
                variant="outline"
                className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-primary transition-all duration-200 flex items-center justify-center"
              >
                {item.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaysToHelpSection;
