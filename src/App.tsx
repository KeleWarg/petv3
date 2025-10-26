import React, { lazy, Suspense, useState, useRef } from "react";
import { HeroBanner } from "./screens/hero-banner/HeroBanner";
import { ChatOverlay } from './components/ChatOverlay';
import { StickyBottomBar } from './components/StickyBottomBar';
import type { ProviderRecommendation, UserPreferences } from './components/ChatOverlay';
import {
  INSURANCE_PLANS,
  COST_DATA,
  PLAN_DETAILS_DATA,
  USER_OPINION_DATA,
  CLAIMS_DATA
} from './data/insurance-providers';

// Lazy load heavy components for better performance
const BestPetsCarousel = lazy(() => import("./screens/BestPetsCarousel/BestPetsCarousel").then(module => ({ default: module.BestPetsCarousel })));
const ElementPc = lazy(() => import("./screens/ElementsPC/ElementPc").then(module => ({ default: module.ElementPc })));

export const App = (): JSX.Element => {
  const [recommendations, setRecommendations] = useState<ProviderRecommendation[] | null>(null);
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const quickDiveRef = useRef<HTMLDivElement>(null);

  const handleRecommendations = (recs: ProviderRecommendation[], preferences: UserPreferences) => {
    console.log('Recommendations:', recs);
    setRecommendations(recs);
    setUserPrefs(preferences);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner onOpenChat={handleOpenChat} quickDiveRef={quickDiveRef} />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading carousel...</div>}>
        <BestPetsCarousel />
      </Suspense>
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading content...</div>}>
        <ElementPc />
      </Suspense>
      <StickyBottomBar 
        onOpenChat={handleOpenChat}
        quickDiveSectionRef={quickDiveRef}
      />
      <ChatOverlay
        plans={INSURANCE_PLANS}
        costData={COST_DATA}
        planDetails={PLAN_DETAILS_DATA}
        userOpinions={USER_OPINION_DATA}
        claimsData={CLAIMS_DATA}
        onRecommendations={handleRecommendations}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />
    </div>
  );
};