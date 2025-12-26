"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FirstVisitLoader from './FirstVisitLoader'

export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    try {
      const seen = typeof window !== 'undefined' && localStorage.getItem('cwa_seen_first_visit')
      if (!seen) {
        setShowLoader(true)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const handleComplete = () => {
    try {
      if (typeof window !== 'undefined') localStorage.setItem('cwa_seen_first_visit', '1')
    } catch (e) {}
    setShowLoader(false)
  }

  // While server-rendered, don't attempt client-only UI until hydrated
  if (!hydrated) return <>{children}</>

  return (
    <>
      {showLoader && <FirstVisitLoader onComplete={handleComplete} />}
      {!showLoader && (
        <motion.div
          key="page"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}
