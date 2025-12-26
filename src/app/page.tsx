"use client"

import React from 'react'
import Layout from '../components/layout/Layout'
import  HeroSection  from '../components/home/HeroSection'
import { AboutSection } from '../components/home/AboutSection'
import CampaignSection  from '../components/home/CampaignSection'
import { FocusAreasSection } from '../components/home/FocusAreasSection'
import { FounderSection } from '../components/home/FounderSection'
import { ImpactStorySection } from '../components/home/ImpactStorySection'
import { WaysToHelpSection } from '../components/home/WaysToHelpSection'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <FocusAreasSection />
      <CampaignSection />
      <ImpactStorySection />
      <WaysToHelpSection />
      <FounderSection />
    </Layout>
  )
}


