import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

interface ContentSectionProps {
  onOpenChat?: () => void;
  quickDiveRef?: React.RefObject<HTMLDivElement>;
  onShowTopPicks?: () => void;
  onShowDiveIntoData?: () => void;
  showTopPicks?: boolean;
  showDiveIntoData?: boolean;
}

export const ContentSection = ({ onOpenChat, quickDiveRef, onShowTopPicks, onShowDiveIntoData, showTopPicks, showDiveIntoData }: ContentSectionProps): JSX.Element => {
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  
  const breadcrumbItems = [
    { label: "ADVISOR", href: "#" },
    { label: "INSURANCE", href: "#" },
    { label: "PET INSURANCE", href: "#" },
  ];

  const authors = [
    {
      name: "Ashlee Valentine",
      role: "Staff Editor",
      type: "Written By",
      image: "/image-2.png",
    },
    {
      name: "Ashlee Valentine",
      role: "Staff Editor",
      type: "Written By",
      image: "/image-2.png",
    },
    {
      name: "Ashlee Valentine",
      role: "Staff Editor",
      type: "Expert Reviewed By",
      image: "/image-2.png",
    },
  ];

  const questionCards = [
    "Does pet insurance cover both dogs and cats under the same plan?",
    "Does pet insurance cover vaccinations and annual checkups?",
    "Are pre-existing conditions covered?",
    "Cheapest pet insurance for a puppy",
    "Which coverage includes dental?",
    "Are pre-existing conditions covered?",
    "How are premiums calculated for pet insurance?",
  ];

  return (
    <section className={`flex z-[1] w-full relative flex-col items-start gap-6 overflow-hidden ${!showTopPicks && !showDiveIntoData ? 'pt-[136px]' : 'pt-0'}`}>
      {!showTopPicks && !showDiveIntoData && (
      <div className="flex flex-col items-center px-0 pb-6 relative w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(245,245,247,1)_100%)] overflow-hidden">
        <div className="w-full max-w-none sm:max-w-[1440px] min-w-0 mx-auto px-4 sm:px-6 md:px-8 lg:px-[90px] overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 sm:gap-5 w-full min-w-0">
            {/* Advertiser Disclosure Section */}
            <div className="col-span-1 sm:col-span-8 md:col-span-10 lg:col-span-12 pt-2">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-2" style={{width: '100%', maxWidth: '1440px'}}>
                <div className="order-2 xl:order-1" style={{color: '#8B94A2', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word'}}>
                  We independently select all products and services. If you click through links we provide, we may earn a commission.
                </div>
                <div className="order-1 xl:order-2" style={{color: '#8B94A2', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '16px', wordWrap: 'break-word', whiteSpace: 'nowrap'}}>
                  Advertiser Disclosure
                </div>
              </div>
            </div>
            
            <div className="col-span-1 sm:col-span-8 md:col-span-10 lg:col-span-12 flex flex-col items-start gap-4 sm:gap-6 min-w-0">
          <div className="flex flex-col w-full items-start gap-4 relative min-w-0 max-w-full constrain-container">
            <Breadcrumb className="w-full max-w-full">
              <BreadcrumbList className="flex items-center gap-1 flex-wrap">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={item.href}
                        className={`[font-family:'Graphik-Regular',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-[18px] ${
                          index < 2 ? 'underline' : ''
                        }`}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator>
                        <img
                          className="w-4 h-4"
                          alt="Separator"
                          src="/svg.svg"
                        />
                      </BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col items-start gap-3 relative w-full min-w-0 max-w-full">
              <h1 className="w-full max-w-full text-[#333333] text-[40px] leading-[48px] sm:text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] font-bold sm:leading-[1.1] md:leading-[1.2] lg:leading-[1.2] constrain-text" style={{ fontFamily: 'Schnyder S' }}>
                Best Pet Insurance Companies of 2025
              </h1>

              <p className="w-full max-w-full font-fixed-styles-utility-medium-regular font-[number:var(--fixed-styles-utility-medium-regular-font-weight)] text-[#333333] text-[length:var(--fixed-styles-utility-medium-regular-font-size)] tracking-[var(--fixed-styles-utility-medium-regular-letter-spacing)] leading-[var(--fixed-styles-utility-medium-regular-line-height)] [font-style:var(--fixed-styles-utility-medium-regular-font-style)] constrain-text">
                Authored &amp; Verified: Sep 12, 2025, 9:05pm
              </p>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 w-full min-w-0">
          <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6 min-w-0">
              <div className="flex flex-col items-start gap-4 relative w-full min-w-0">
                <div className="flex items-center gap-1 relative w-full min-w-0 overflow-hidden">
                  <Badge className="inline-flex h-12 items-center justify-center gap-1.5 pl-3 pr-4 py-2.5 bg-black text-white hover:bg-black rounded-none flex-shrink-0">
                    <img
                      className="w-[15.4px] h-5 object-contain flex-shrink-0"
                      alt="Asset"
                      src="/Asset 45 1.svg"
                    />
                    <span className="[font-family:'Work_Sans',Helvetica] font-bold text-sm tracking-[1.00px] leading-[21px] whitespace-nowrap">
                      HOW WE ANALYZED
                    </span>
                  </Badge>
                  <div className="flex-1 h-px bg-gray-300 min-w-4"></div>
                </div>

                <p className="[font-family:'Work_Sans',Helvetica] font-normal text-black text-sm tracking-[0] leading-6 break-words overflow-wrap-anywhere w-full">
                  We reviewed 900,024 pet insurance rates across the U.S to
                  provide you with a comprehensive report covering 34 categories
                  and surveying 2,600 pet parents covering 300 breeds.{" "}
                  <span 
                    className="underline cursor-pointer"
                    onClick={() => {
                      const methodologySection = document.getElementById('methodology');
                      if (methodologySection) {
                        const elementTop = methodologySection.getBoundingClientRect().top + window.pageYOffset;
                        const offsetTop = elementTop - 80;
                        window.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    Read our methodology
                  </span>
                </p>
              </div>

              <Card className="w-full bg-[#ffffffcc] rounded-lg border-none shadow-[0px_0px_16px_4px_#7d0af81f,inset_0_1px_0px_rgba(255,255,255,0.48),inset_1px_0_0px_rgba(255,255,255,0.38),inset_0_-1px_1px_rgba(0,0,0,0.24),inset_-1px_0_1px_rgba(0,0,0,0.19)] backdrop-blur-sm backdrop-brightness-[118.0%] backdrop-saturate-[124.0%] backdrop-contrast-[118.0%] [-webkit-backdrop-filter:blur(4px)_brightness(118.0%)_saturate(124.0%)_contrast(118.0%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-lg before:[background:linear-gradient(90deg,rgba(0,122,200,0.4)_0%,rgba(255,177,54,0.4)_50%,rgba(220,0,0,0.4)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none">
                <CardContent className="p-0 flex items-center justify-center gap-2.5 pt-5 pb-0 px-0">
                  <Button
                    variant="ghost"
                    onClick={() => window.open('https://import-best-of-llm-d-yyv6.bolt.host/', '_blank')}
                    className="inline-flex items-center gap-2 pt-0 pb-4 px-4 h-auto hover:bg-transparent"
                  >
                    <span className="[font-family:'Work_Sans',Helvetica] font-normal text-black text-base tracking-[0] leading-6">
                      Find me the right option
                    </span>
                    <img
                      className="w-6 h-6"
                      alt="Line arrow right"
                      src="/-line-arrow-right.svg"
                    />
                  </Button>
                </CardContent>
              </Card>
            </div>

          <div className="col-span-1 lg:col-span-5">
            <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 24, backgroundImage: 'url(/HeroImage3.png)', backgroundSize: 'cover', backgroundPosition: '50% 50%', minHeight: '230px'}} className="hidden lg:block">
              {/* Grouped Badge Container - Vertically Centered */}
              <div style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-end'}}>
                <div style={{width: 'auto', height: 40, padding: '6px 10px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: 8, backdropFilter: 'blur(6px)', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                  <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex', flexShrink: 0}}>
                    <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0}}>
                      <img src="/activity-heart.svg" alt="Average Cost" style={{width: 24, height: 24, position: 'absolute', filter: 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(75%) contrast(100%)'}} />
                    </div>
                    <div style={{color: 'rgb(191, 191, 191)', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>Average Cost</div>
                  </div>
                  <div style={{textAlign: 'right', color: 'white', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>As low as $24/mo</div>
                </div>
                
                <div style={{width: 'auto', height: 40, padding: '6px 10px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: 8, backdropFilter: 'blur(6px)', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                  <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex', flexShrink: 0}}>
                    <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0}}>
                      <img src="/activity-heart.svg" alt="Eligibility" style={{width: 24, height: 24, position: 'absolute', filter: 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(75%) contrast(100%)'}} />
                    </div>
                    <div style={{color: 'rgb(191, 191, 191)', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>Eligibility</div>
                  </div>
                  <div style={{textAlign: 'right', color: 'white', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>Typically kicks in 3-4 weeks</div>
                </div>
                
                <div style={{width: 'auto', height: 40, padding: '6px 10px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: 8, backdropFilter: 'blur(6px)', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                  <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex', flexShrink: 0}}>
                    <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden', flexShrink: 0}}>
                      <img src="/activity-heart.svg" alt="Wellness Options" style={{width: 24, height: 24, position: 'absolute', filter: 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(75%) contrast(100%)'}} />
                    </div>
                    <div style={{color: 'rgb(191, 191, 191)', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>Wellness Options</div>
                  </div>
                  <div style={{textAlign: 'right', color: 'white', fontSize: 12, fontFamily: 'Work Sans', fontWeight: '600', lineHeight: '12px', wordWrap: 'break-word', flexShrink: 0, whiteSpace: 'nowrap'}}>7 of 12 listed partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-start gap-3 sm:gap-4 relative">
          {/* Mobile view - show first author and expandable others */}
          <div className="sm:hidden flex flex-col items-start gap-2">
            <div className="inline-flex items-center gap-2 relative">
              <img
                className="w-8 h-8 rounded-3xl object-cover flex-shrink-0"
                alt="Author"
                src={authors[0].image}
              />
              <div className="inline-flex flex-col items-start relative">
                <div className="inline-flex items-center gap-0.5 relative">
                  <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs tracking-[0] leading-[16px] break-words">
                    {authors[0].type}
                  </span>
                  <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs tracking-[0] leading-[16px] underline break-words">
                    {authors[0].name}
                  </span>
                </div>
                <span className="[font-family:'Work_Sans',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-4 break-words">
                  {authors[0].role}
                </span>
              </div>
            </div>
            
            {/* Additional authors - shown when expanded */}
            {showAllAuthors && (
              <div className="flex flex-col gap-2">
                {authors.slice(1).map((author, index) => (
                  <div key={index + 1} className="inline-flex items-center gap-2 relative">
                    <img
                      className="w-8 h-8 rounded-3xl object-cover flex-shrink-0"
                      alt="Author"
                      src={author.image}
                    />
                    <div className="inline-flex flex-col items-start relative">
                      <div className="inline-flex items-center gap-0.5 relative">
                        <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs tracking-[0] leading-[16px] break-words">
                          {author.type}
                        </span>
                        <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs tracking-[0] leading-[16px] underline break-words">
                          {author.name}
                        </span>
                      </div>
                      <span className="[font-family:'Work_Sans',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-4 break-words">
                        {author.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Toggle CTA */}
            <button
              onClick={() => setShowAllAuthors(!showAllAuthors)}
              className="[font-family:'Work_Sans',Helvetica] font-normal text-[#007AC8] text-xs tracking-[0] leading-4 break-words cursor-pointer hover:underline transition-all duration-200"
            >
              {showAllAuthors ? 'Show less' : '& 2 others'}
            </button>
          </div>

          {/* Desktop view - show all authors */}
          <div className="hidden sm:inline-flex items-center gap-6 sm:gap-10 relative flex-wrap">
            {authors.map((author, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 sm:gap-3 relative"
              >
                <img
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-3xl object-cover flex-shrink-0"
                  alt="Author"
                  src={author.image}
                />
                <div className="inline-flex flex-col items-start relative">
                  <div className="inline-flex items-center gap-0.5 relative">
                    <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs sm:text-sm tracking-[0] leading-[16px] sm:leading-[19.6px] break-words">
                      {author.type}
                    </span>
                    <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#333333] text-xs sm:text-sm tracking-[0] leading-[16px] sm:leading-[19.6px] underline break-words">
                      {author.name}
                    </span>
                  </div>
                  <span className="[font-family:'Work_Sans',Helvetica] font-normal text-[#333333] text-xs tracking-[0] leading-4 break-words">
                    {author.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {!showTopPicks && !showDiveIntoData && (
      <div ref={quickDiveRef} className="w-full pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-solid border-[#eceff3] overflow-hidden">
        <div className="w-full max-w-none sm:max-w-[1440px] min-w-0 mx-auto px-4 sm:px-6 md:px-8 lg:px-[90px]">
          <div className="grid grid-cols-1 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 sm:gap-5 w-full min-w-0">
            <div className="col-span-1 sm:col-span-8 md:col-span-10 lg:col-span-12 flex flex-col items-start gap-4 sm:gap-5 min-w-0">
              {/* Header Section */}
              <div className="flex flex-col gap-2 w-full">
                <div className="text-black text-lg sm:text-xl font-bold leading-[22px] sm:leading-[26px]" style={{ fontFamily: 'Work Sans' }}>
                  Quick dive
                </div>
                <div className="text-[#606F7F] text-sm sm:text-base leading-[22px] sm:leading-[26px]" style={{ fontFamily: 'Work Sans', fontWeight: '400' }}>
                  Talk to our AI for quick recommendations, or our editor top recommendations, or dive into all the data we gather across pricing, coverage, ratings and more. You can customize your experience.
                </div>
              </div>

              {/* Buttons Section */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
                {/* Ask Forbes AI Button */}
                <div 
                  onClick={onOpenChat}
                  className="relative w-full sm:w-auto sm:min-w-[280px] lg:min-w-[411px] py-4 px-4 bg-black rounded-lg border-none flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-900 transition-all hover:scale-[1.02] active:scale-[0.98] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-lg before:[background:linear-gradient(90deg,rgba(0,122,200,0.4)_0%,rgba(255,177,54,0.4)_50%,rgba(220,0,0,0.4)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
                >
                  <img src="/ForbesAIIcon.svg" alt="Forbes AI" className="w-5 h-5 flex-shrink-0 relative z-[2]" />
                  <div className="text-white text-sm sm:text-base leading-6 relative z-[2]" style={{ fontFamily: 'Work Sans', fontWeight: '400' }}>
                    Ask Forbes AI
                  </div>
                </div>

                {/* Top Editorial Picks Button */}
                <div 
                  onClick={onShowTopPicks}
                  className="flex-1 min-h-[56px] py-2 px-4 bg-white rounded-xl border border-[#F4F5F8] shadow-[0px_4px_23px_-1px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2.5 cursor-pointer hover:border-[#007AC8] transition-all"
                >
                  <img src="/EditorPick.svg" alt="Editor Pick" className="w-6 h-6 flex-shrink-0" />
                  <div className="text-[#606F7F] text-sm leading-6" style={{ fontFamily: 'Work Sans', fontWeight: '600' }}>
                    Top Editorial Picks
                  </div>
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="#606F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Dive into the data Button */}
                <div
                  onClick={onShowDiveIntoData}
                  className="flex-1 min-h-[56px] py-2 px-4 bg-white rounded-xl border border-[#F4F5F8] shadow-[0px_4px_23px_-1px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2.5 cursor-pointer hover:border-[#007AC8] transition-all"
                >
                  <img src="/bar-chart-04.svg" alt="Data" className="w-6 h-6 flex-shrink-0" />
                  <div className="text-[#606F7F] text-sm leading-6" style={{ fontFamily: 'Work Sans', fontWeight: '600' }}>
                    Dive into the data
                  </div>
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="#606F7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
};