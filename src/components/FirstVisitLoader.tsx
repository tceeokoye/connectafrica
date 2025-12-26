import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.jpg";

interface FirstVisitLoaderProps {
  onComplete: () => void;
}

const FirstVisitLoader = ({ onComplete }: FirstVisitLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowContent(false);
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return prev + 3;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="fixed inset-0 z-[100] bg-earth flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated background rings */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-earth-foreground/10"
                style={{
                  width: `${200 + i * 120}px`,
                  height: `${200 + i * 120}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold shadow-xl">
              <Image src={logo} alt="Connect with Africa" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mt-6 text-2xl md:text-3xl font-display text-earth-foreground text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            Connect with Africa
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-2 text-earth-foreground/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Bridging Communities, Building Futures
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="mt-10 w-56 h-1 bg-earth-foreground/20 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          {/* Progress percentage */}
          <motion.span
            className="mt-3 text-sm text-earth-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress}%
          </motion.span>

          {/* Loading dots */}
          <motion.div
            className="absolute bottom-8 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gold rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitLoader;
