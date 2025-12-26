"use client"

import { RootState } from '@/store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const dynamic = 'force-dynamic'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.token.token)

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin/login'
    } 
  }, [token])
  console.log("token in layout", token);
  return <>{children}</>
}
