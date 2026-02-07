"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Founder from "@/assets/Founder.jpeg";

export default function FounderSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row justify-center lg:gap-40 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start  w-fit"
          >
            <div className="relative w-full sm:w-[300px] md:w-[320px] lg:w-[400px] ">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 via-gold/20 to-accent/20 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={Founder}
                  alt="Cajetan Onu - Founder"
                  width={500}
                  height={420}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 w-full md:w-1/2"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-3">
              Leadership
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Our Founder
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <span className="font-semibold text-foreground">Cajetan Onu, JD</span>, 
              is the Founder and Executive Director of Connect with Africa. With expertise 
              in law, compliance, and community development, he has dedicated his work to 
              bridging global partners with underserved African communities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              His recent visits to primary healthcare centers in Nigeria inform every aspect 
              of this mission. Through firsthand experience, he has witnessed both the challenges 
              and the incredible resilience of healthcare workers.
            </p>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-4 p-5 bg-card/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md"
            >
              <p className="text-foreground italic text-base sm:text-lg">
                "Every container we send is more than supplies – it's a message to 
                healthcare workers that the world sees them, values them, and stands with them."
              </p>
              <p className="text-gold font-semibold mt-3 text-sm sm:text-base">
                — Cajetan Onu
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
