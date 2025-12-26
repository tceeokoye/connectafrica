"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Package, Stethoscope, Baby, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import supply from "@/assets/hospitalSuply.jpeg";

export default function CampaignSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-full lg:max-w-lg break-words"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4 md:mb-6 break-words">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              Current Priority
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6 break-words">
              Urgent Medical Container Campaign
            </h2>

            <p className="text-sm sm:text-base md:text-base text-muted-foreground mb-6 md:mb-8 break-words">
              Right now, Connect with Africa is preparing two containers of
              essential medical supplies for primary healthcare centers in
              Nigeria. These clinics lack gloves, basic diagnostic tools, wound
              care materials, and safe delivery supplies for mothers and
              newborns.
            </p>

            <div className="w-full">
              <Button
                size="sm"
                className="bg-primary transition-colors w-full "
              >
                Support the Campaign
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full"
          >
            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px]">
              <Image
                src={supply}
                alt="Medical supplies and healthcare"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/60 to-transparent" />
            </div>

            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="absolute -bottom-6 left-0 md:left-[-32px] bg-card p-4 sm:p-6 rounded-xl shadow-xl max-w-[280px]"
            >
              <div className="mb-3">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground text-xs sm:text-sm">
                    65%
                  </span>
                </div>
                <div className="h-2 sm:h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "65%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Raised</span>
                <span className="font-semibold text-primary text-xs sm:text-sm">
                  $32,500 / $50,000
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
