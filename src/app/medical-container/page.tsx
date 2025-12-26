"use client"

import React from 'react'
import Layout from '../../components/layout/Layout'

export default function MedicalContainerPage() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Medical Container Campaign</h1>
        <p className="text-muted-foreground max-w-3xl">This campaign focuses on shipping large containers of medical supplies to partner clinics. Here is a hardcoded overview for the demo.</p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded border">Project stats and timeline (hardcoded)</div>
          <div className="p-6 bg-white rounded border">How donations are used (hardcoded)</div>
        </div>
      </section>
    </Layout>
  )
}
