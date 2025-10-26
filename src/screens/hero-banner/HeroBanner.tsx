import React from "react";
import { ContentSection } from "./sections/ContentSection/ContentSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { CustomNavigationSection } from "./sections/CustomNavigationSection/CustomNavigationSection";

interface HeroBannerProps {
  onOpenChat?: () => void;
  quickDiveRef?: React.RefObject<HTMLDivElement>;
}

export const HeroBanner = ({ onOpenChat, quickDiveRef }: HeroBannerProps): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-w-[378px] min-h-[790px] flex flex-col">
      <div className="grouped-header">
        <HeaderSection />
        <CustomNavigationSection />
      </div>
      <ContentSection onOpenChat={onOpenChat} quickDiveRef={quickDiveRef} />
    </div>
  );
};
