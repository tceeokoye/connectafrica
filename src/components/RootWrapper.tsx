"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FirstVisitLoader from "./FirstVisitLoader";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setHydrated(true);

    try {
      const seen = localStorage.getItem("cwa_seen_first_visit");
      if (!seen) {
        setShowLoader(true);
      }
    } catch {}
  }, []);

  const handleComplete = () => {
    try {
      localStorage.setItem("cwa_seen_first_visit", "1");
    } catch {}
    setShowLoader(false);
  };

  if (!hydrated) return null; // important: render nothing until ready

  return (
    <>
      {showLoader ? (
        <FirstVisitLoader onComplete={handleComplete} />
      ) : (
        <motion.div
          key="page"
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
