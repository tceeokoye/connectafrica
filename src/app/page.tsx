"use client"

import React from 'react'
import Layout from '../components/layout/Layout'
import  HeroSection  from '../components/home/HeroSection'
import { MissionVisionValuesSection } from '../components/home/MissionVisionValuesSection'
import { ImpactMetricsSection } from '../components/home/ImpactMetricsSection'
import { AboutSection } from '../components/home/AboutSection'
import { FocusAreasSection } from '../components/home/FocusAreasSection'
import CampaignSection  from '../components/home/CampaignSection'
import { ImpactStorySection } from '../components/home/ImpactStorySection'
import { TransparencySection } from '../components/home/TransparencySection'
import { WaysToHelpSection } from '../components/home/WaysToHelpSection'
import { NewsletterSection } from '../components/home/NewsletterSection'
import  FounderSection  from '../components/home/FounderSection'

export default function Home() {
  return (
    
    <Layout className="overflow-x-hidden" >
      <HeroSection />
      <MissionVisionValuesSection />
      <ImpactMetricsSection />
      <AboutSection />
      <FocusAreasSection />
      <CampaignSection />
      <ImpactStorySection />
      <TransparencySection />
      <WaysToHelpSection />
      <NewsletterSection />
      <FounderSection />
    </Layout>
  )
}


