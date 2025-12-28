"use client";

import { motion } from "framer-motion";

interface WireframeLoaderProps {
  fullScreen?: boolean;
}

const WireframeLoader = ({ fullScreen = false }: WireframeLoaderProps) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-50 bg-background flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="relative w-64 h-80">
        {/* Wireframe skeleton */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header wireframe */}
          <motion.div
            className="h-8 mx-4 mt-4 bg-primary/20 rounded"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          
          {/* Content lines */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 mx-4 mt-3 bg-muted-foreground/15 rounded"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              style={{ transformOrigin: "left", width: `${85 - i * 15}%` }}
            />
          ))}

          {/* Image placeholder */}
          <motion.div
            className="h-24 mx-4 mt-4 bg-accent/20 rounded flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="w-10 h-10 border-2 border-accent/40 rounded"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* More lines */}
          {[0, 1].map((i) => (
            <motion.div
              key={`line-${i}`}
              className="h-3 mx-4 mt-3 bg-muted-foreground/15 rounded"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.1, ease: "easeOut" }}
              style={{ transformOrigin: "left", width: `${75 - i * 10}%` }}
            />
          ))}

          {/* Button wireframe */}
          <motion.div
            className="h-8 w-24 mx-4 mt-4 bg-primary/30 rounded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          />
        </motion.div>

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Loading text */}
        <motion.p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default WireframeLoader;
