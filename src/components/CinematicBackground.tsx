"use client";
import { motion } from "framer-motion";

export default function CinematicBackground({ image }: { image: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.3, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      className="absolute inset-0 -z-10"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image.src}')` }}
        animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
      />

      {/* SAME COLOR LANGUAGE AS HERO */}
      <div className="absolute inset-0 bg-emerald-400/10" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/80 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
    </motion.div>
  );
}
