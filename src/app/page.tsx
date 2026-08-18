"use client";

import React from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/home/HeroSection";
import MissionSection from "../components/home/MissionSection";
import TheChallengeSection from "../components/home/TheChallengeSection";
import WhatWeDoSection from "../components/home/WhatWeDoSection";
import FeaturedInitiativeSection from "../components/home/FeaturedInitiativeSection";
import ImpactSection from "../components/home/ImpactSection";

export default function Home() {
  return (
    <Layout className="overflow-x-hidden">
      <HeroSection />
      <MissionSection />
      <TheChallengeSection />
      <WhatWeDoSection />
      <FeaturedInitiativeSection />
      <ImpactSection />
    </Layout>
  );
}
