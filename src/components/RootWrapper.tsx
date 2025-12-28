"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstVisitLoader from "./FirstVisitLoader";
import WireframeLoader from "./WireframeLoader";
import { usePathname } from "next/navigation";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const [showFirstVisit, setShowFirstVisit] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);

  // On mount, check if we need to show FirstVisitLoader
  useEffect(() => {
    setHydrated(true);

    if (pathname === "/") {
      try {
        const seen = sessionStorage.getItem("cwa_seen_first_visit");
        if (!seen) {
          setShowFirstVisit(true);
        }
      } catch {}
    }
  }, [pathname]);

  const handleFirstVisitComplete = () => {
    try {
      sessionStorage.setItem("cwa_seen_first_visit", "1");
    } catch {}
    setShowFirstVisit(false);
  };

  // Wireframe loader for route changes (except first load)
  useEffect(() => {
    if (!hydrated) return;

    // Only show wireframe for page transitions, not initial load
    if (pathname !== "/" || (pathname === "/" && showFirstVisit === false)) {
      setShowWireframe(true);
      const timer = setTimeout(() => setShowWireframe(false), 600); // adjust duration
      return () => clearTimeout(timer);
    }
  }, [pathname, hydrated, showFirstVisit]);

  if (!hydrated) return null;

  return (
    <>
      {showFirstVisit ? (
        <FirstVisitLoader onComplete={handleFirstVisitComplete} />
      ) : showWireframe ? (
        <WireframeLoader fullScreen />
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
