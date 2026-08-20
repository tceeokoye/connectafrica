import { motion } from "framer-motion";
import { Heart, Users, Globe } from "lucide-react";
import Image from "next/image";
import aboutImage from "@/assets/aboutImage.jpeg"

export const AboutSection = () => {
  const features = [
    { icon: Heart, text: "Direct impact on healthcare facilities" },
    { icon: Users, text: "Community-driven partnerships" },
    { icon: Globe, text: "Global network of supporters" },
  ];

  return (
    <section className="relative py-20 md:py-8 bg-background overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08),transparent_40%)]" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative group order-1 lg:order-none"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src={aboutImage} alt="African doctor using phone to coordinate healthcare delivery" width={500} height={560} className="w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>
            {/* Floating Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-2xl max-w-[220px] hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-white/70 text-sm">Lives Touched</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-none"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-6"
            >
              Who We Are
            </motion.span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              About Connect with Africa
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-5 text-base md:text-lg">
              Connect with Africa is a humanitarian initiative dedicated to bridging global generosity with local needs across African communities. We work alongside clinics, community leaders, and development partners to deliver medical supplies, support healthcare workers, and create pathways for long-term change.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
              From primary healthcare centers in Nigeria to rural communities with limited access to care, our mission is simple: <span className="text-foreground font-semibold">equip those who serve on the frontlines so they can save lives with dignity.</span>
            </p>

            {/* Features */}
            <div className="space-y-5">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-foreground text-base md:text-lg font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
