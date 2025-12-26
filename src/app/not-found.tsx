import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
        <p className="mt-4">Sorry, we couldn\'t find that page.</p>
        <div className="mt-6">
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Go Home</Link>
        </div>
      </div>
    </div>
  )
}
