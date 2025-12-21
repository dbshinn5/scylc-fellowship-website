"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

// Image URLs
const images = {
  youngNC: "/images/Story page/youngnc1.webp",
  nosebleed: "/images/Story page/nosebleed.webp",
  ncBed: "/images/Story page/ncbed.webp",
  oilfield: "/images/Story page/Oilfield.webp",
  threeGen: "/images/Story page/3gen.webp",
  acoFist: "/images/Story page/ACOFist.webp",
  pomThumbnail: "/images/Story page/POMthumbnail.webp",
};

interface Section {
  text?: string;
  highlight?: string;
  isIntro?: boolean;
  noPhoto?: boolean;
  isCardFan?: boolean;
  images?: string[];
  image?: string;
  isLandscape?: boolean;
  isLarge?: boolean;
  isLargeLandscape?: boolean;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  photoCredit?: string;
}

const sections: Section[] = [
  {
    highlight: "OUR STORY",
    isIntro: true,
    noPhoto: true,
  },
  {
    text: "Our journey began when I was just nine years old, growing up across the street from an active oil and gas well in South Los Angeles. The pollution severely impacted my health — I experienced nosebleeds, asthma, and even cancer — all before turning 20. That's where our fight began, and where my story continues.",
    isCardFan: true,
    images: [images.youngNC, images.nosebleed, images.ncBed],
    offsetX: 40,
    offsetY: 60,
  },
  {
    text: "Los Angeles sits on the largest urban oil field in the nation, where drilling happens in the middle of neighborhoods, near homes, schools, and parks. Together, we've worked tirelessly to change that reality.",
    image: images.oilfield,
    isLandscape: true,
    rotation: 4,
    offsetX: 50,
    offsetY: 120,
  },
  {
    text: "Our advocacy helped win a statewide law in California creating a 3,200-foot health and safety buffer between new oil and gas wells and sensitive sites like homes, schools, and hospitals — and requiring stronger protections for existing wells, despite Big Oil spending over $61 million to stop it.",
    image: images.threeGen,
    isLarge: true,
    rotation: -3,
    offsetX: 30,
    offsetY: 80,
    photoCredit: "Photo Credit - Garrett Grove",
  },
  {
    text: "Here in L.A., we also helped lead the charge for unanimous city and county votes to phase out existing oil drilling and ban new wells — a historic victory that will close the largest urban oil field in the United States.",
    image: images.acoFist,
    isLandscape: true,
    isLargeLandscape: true,
    rotation: 5,
    offsetX: 50,
    offsetY: 90,
    photoCredit: "Photo Credit - Garrett Grove",
  },
  {
    highlight: "I AM HONORED\nTO DO THIS WORK ALONGSIDE\nMY MOM.",
    image: images.pomThumbnail,
    isLandscape: true,
    isLargeLandscape: true,
    rotation: -4,
    offsetX: 40,
    offsetY: 100,
  },
];

// Card fan component for the first section with 3 splayed photos
function CardFan({
  images,
  style,
  className,
  isMobile = false,
}: {
  images: string[];
  style?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
}) {
  // Mobile: center the cards in viewport
  // Desktop: use pixel positions
  const fanPositionsMobile = [
    { rotation: -18, zIndex: 1, translateX: -90, translateY: 0 },
    { rotation: 0, zIndex: 3, translateX: 0, translateY: 0 },
    { rotation: 18, zIndex: 2, translateX: 90, translateY: 0 },
  ];
  
  const fanPositionsDesktop = [
    { left: 0, top: 50, rotation: -18, zIndex: 1, translateX: 0, translateY: 0 },
    { left: 120, top: 15, rotation: 0, zIndex: 3, translateX: 0, translateY: 0 },
    { left: 240, top: 50, rotation: 18, zIndex: 2, translateX: 0, translateY: 0 },
  ];

  const fanPositions = isMobile ? fanPositionsMobile : fanPositionsDesktop;

  return (
    <div className={className} style={style}>
      {images.map((img, idx) => {
        if (isMobile) {
          const pos = fanPositionsMobile[idx];
          return (
            <div
              key={idx}
              className="absolute bg-[#f5f5f0] shadow-lg"
              style={{
                width: "150px", // Reduced from 180px to prevent overflow
                maxWidth: "calc((100vw - 114px) / 3)", // Ensure cards fit within container
                padding: "0.5rem", // 0.5rem frame for cards
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${pos.translateX * 0.8}px, ${pos.translateY}px) rotate(${pos.rotation}deg)`, // Reduced translateX by 20%
                zIndex: pos.zIndex,
                transformOrigin: "center center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={img}
                alt=""
                className={`w-full h-[180px] object-cover ${idx > 0 ? "grayscale" : ""}`}
              />
            </div>
          );
        } else {
          const pos = fanPositionsDesktop[idx];
          return (
            <div
              key={idx}
              className="absolute bg-[#f5f5f0] shadow-lg"
              style={{
                width: "180px",
                padding: "0.5rem", // 0.5rem frame for cards
                left: pos.left,
                top: pos.top,
                transform: `translate(${pos.translateX}px, ${pos.translateY}px) rotate(${pos.rotation}deg)`,
                zIndex: pos.zIndex,
                transformOrigin: "center center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={img}
                alt=""
                className={`w-full h-[220px] object-cover ${idx > 0 ? "grayscale" : ""}`}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

// Polaroid component
function Polaroid({
  src,
  isLandscape,
  isLarge,
  isLargeLandscape,
  rotation = 0,
  style,
  className,
  isMobile = false,
  photoCredit,
}: {
  src: string;
  isLandscape?: boolean;
  isLarge?: boolean;
  isLargeLandscape?: boolean;
  rotation?: number;
  style?: React.CSSProperties;
  className?: string;
  isMobile?: boolean;
  photoCredit?: string;
}) {
  let width = "320px";
  let height = "380px";

  if (isLandscape) {
    width = "400px";
    height = "250px";
  }
  if (isLargeLandscape) {
    width = "480px";
    height = "300px";
  }
  if (isLarge) {
    width = "420px";
    height = "450px";
  }

  // Scale down larger photos for mobile (3 cards are fine, so only scale large/landscape photos)
  if (isMobile && (isLarge || isLandscape || isLargeLandscape)) {
    const scale = 0.55; // Scale to 55% on mobile to prevent overflow
    // Convert to numeric values for calculation
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    width = `${widthNum * scale}px`;
    height = `${heightNum * scale}px`;
  }
  
  // Also scale down regular photos on mobile if they're still too large
  if (isMobile && !isLarge && !isLandscape && !isLargeLandscape) {
    const scale = 0.65; // Scale regular photos to 65% on mobile
    const widthNum = parseFloat(width);
    const heightNum = parseFloat(height);
    width = `${widthNum * scale}px`;
    height = `${heightNum * scale}px`;
  }

  return (
    <div
      className={`bg-[#f5f5f0] ${className}`}
      style={{
        width,
        maxWidth: isMobile ? "calc(100vw - 114px)" : width, // Account for 82px left + 32px right padding on mobile
        padding: "1rem", // 1rem frame for all photos
        boxShadow: "0 4px 6px rgba(0,0,0,0.3), 0 10px 40px rgba(0,0,0,0.4)",
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    >
      <img
        src={src}
        alt=""
        className="w-full object-cover"
        style={{ height }}
      />
      {photoCredit && (
        <div
          style={{
            marginTop: "0.75rem",
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            color: "#666",
            fontFamily: "'DM Sans', sans-serif",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {photoCredit}
        </div>
      )}
    </div>
  );
}

export function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSections = sections.length;

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const totalScrollable = containerHeight - viewportHeight;
    const newProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    setProgress(newProgress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Calculate section progress for mobile
  // Adjust progress - last section should be centered in viewport
  const mobileProgressMultiplier = 0.85; // Stop slightly later (was 0.75)
  const adjustedProgress = isMobile ? progress * mobileProgressMultiplier : progress;
  const sectionProgress = adjustedProgress * totalSections;
  const currentSection = Math.min(totalSections - 1, Math.floor(sectionProgress));
  const sectionFraction = sectionProgress - currentSection;

  // Desktop text scroll - end when last section is positioned in upper-middle of viewport (~35% from top)
  // The transform is: translateY(35 - textProgress * (totalSections * 60))vh
  // Each section is 60vh tall (min-h-[60vh])
  // Last section (index 5) starts at: 5 * 60vh = 300vh from top of text container
  // To position it at upper-middle (35vh from top), we need:
  //   300vh + (35 - textProgress * 360)vh = 35vh
  //   Solving: textProgress = (35 + 300 - 35) / 360 = 300 / 360 = 0.8333
  const sectionHeight = 60; // 60vh per section
  const lastSectionIndex = totalSections - 1; // Index 5
  const lastSectionStartPosition = lastSectionIndex * sectionHeight; // 300vh
  const targetViewportPosition = 35; // 35vh from top (upper-middle of viewport)
  const initialOffset = 35; // 35vh (starting transform)
  const maxTransformRange = totalSections * sectionHeight; // 360vh
  // Calculate progress needed for text to reach target position: initialOffset - textProgress * maxTransformRange + lastSectionStartPosition = targetViewportPosition
  // textProgress = (initialOffset + lastSectionStartPosition - targetViewportPosition) / maxTransformRange
  const baseMaxTextProgress = (initialOffset + lastSectionStartPosition - targetViewportPosition) / maxTransformRange;
  const maxTextProgress = Math.min(1, baseMaxTextProgress + 0.10); // Allow 10% more scrolling for smooth landing
  // Allow photos to animate fully (use full progress), but cap text animation separately
  const textProgress = Math.min(progress, maxTextProgress);
  const cappedProgress = progress; // Use full progress for photos

  // Get text transform for mobile
  const getTextTransform = (index: number) => {
    if (!isMobile) return {};

    const containerHeight = textContainerRef.current?.offsetHeight || window.innerHeight * 0.55;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight * 0.5; // Center of viewport (50%)
    
    let yOffset: number;
    let opacity: number;

    if (index < currentSection) {
      yOffset = -containerHeight;
      opacity = 0;
    } else if (index === currentSection) {
      // For last section, center it in the viewport (accounting for gradient and photo section)
      if (index === totalSections - 1 && currentSection === totalSections - 1 && sectionFraction >= 0.9) {
        // Center the text in the viewport
        // Text container is 55vh tall (h-[55vh]) and positioned at top-1/2 (50% from top)
        // Viewport center is at 50vh from top
        // Text container center is at 27.5vh (55vh / 2)
        // To center text in viewport: need to move from 27.5vh to 50vh = 22.5vh down
        // But container is at top-1/2, which means its top is at 50% of parent
        // Actually, let's calculate: viewport center (50vh) - text container center (27.5vh) = 22.5vh
        // Since transform is relative to element, and container is at top-1/2,
        // we need to move down by the difference
        const textContainerCenter = viewportHeight * 0.275; // 55vh / 2 = 27.5vh
        const viewportCenter = viewportHeight * 0.5; // 50vh
        const offsetNeeded = viewportCenter - textContainerCenter; // 22.5vh
        yOffset = offsetNeeded;
        opacity = 1;
      } else {
        yOffset = -sectionFraction * containerHeight;
        opacity = 1 - sectionFraction * 0.8;
      }
    } else if (index === currentSection + 1) {
      yOffset = containerHeight * (1 - sectionFraction);
      opacity = sectionFraction;
    } else {
      yOffset = containerHeight;
      opacity = 0;
    }

    return {
      transform: `translateY(calc(-50% + ${yOffset}px))`,
      opacity,
    };
  };

  // Get photo visibility for mobile
  const getPhotoStyle = (index: number, section: Section) => {
    if (!isMobile) {
      // Desktop animation
      const photoStart = index / totalSections;
      const photoProgress = (cappedProgress - photoStart + 0.1) / 0.15;
      const clampedProgress = Math.max(0, Math.min(1, photoProgress));
      const translateX = (1 - clampedProgress) * -150;

      return {
        transform: section.isCardFan
          ? `translateX(${translateX}%)`
          : `translateX(${translateX}%) rotate(${section.rotation || 0}deg)`,
        opacity: clampedProgress,
      };
    }

    // Mobile animation - photos appear after paragraph is fully in view
    const containerHeight = textContainerRef.current?.offsetHeight || window.innerHeight * 0.55;
    let opacity: number;
    let transition: string;

    // Photo appears after text paragraph is fully visible (when sectionFraction reaches ~0.6)
    const photoAppearThreshold = 0.6;

    if (index < currentSection) {
      // Past photos are hidden
      opacity = 0;
      transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
    } else if (index === currentSection) {
      // Current photo - visible while its text paragraph is in view
      // Hide when next section's text starts appearing (sectionFraction > photoAppearThreshold)
      if (sectionFraction > photoAppearThreshold) {
        // Next section's text is fully in view, hide current photo
        opacity = 0;
        transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
      } else {
        // Current photo visible while its text is in view
        opacity = 1;
        transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
      }
    } else if (index === currentSection + 1) {
      // Next photo - appear after its paragraph is fully in view
      if (sectionFraction >= photoAppearThreshold) {
        // Paragraph is fully in view, show photo quickly
        opacity = 1;
        transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
      } else {
        // Paragraph not fully in view yet, keep photo hidden
        opacity = 0;
        transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
      }
    } else {
      // Future photos not visible
      opacity = 0;
      transition = "opacity 0.15s ease-out, transform 0.15s ease-out";
    }

    const rotation = (section.rotation || 0) * 0.7;
    // For cardFan, use smaller offsets to keep it more centered
    const offsetX = section.isCardFan ? 0 : (index % 2 === 0 ? -1 : 1) * (index * 8);
    const offsetY = section.isCardFan ? 0 : index * 5;

    // All photos use the same positioning on mobile
    return {
      transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`,
      opacity,
      transition,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[var(--color-base,#0D0D0D)]"
      style={{ height: `${totalSections * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient overlays */}
        <div
          className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
          style={isMobile ? {
            height: 200,
            background: `linear-gradient(to bottom, var(--color-base,#0D0D0D) 0%, var(--color-base,#0D0D0D) 30%, transparent 100%)`,
          } : {
            height: 200,
            background: `linear-gradient(to bottom, var(--color-base,#0D0D0D) 0%, var(--color-base,#0D0D0D) 30%, transparent 100%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-50 pointer-events-none"
          style={{
            display: isMobile ? "none" : "block", // Hide bottom gradient on mobile
            height: 200,
            background: `linear-gradient(to top, var(--color-base,#0D0D0D) 0%, var(--color-base,#0D0D0D) 30%, transparent 100%)`,
          }}
        />

        {/* Main content */}
        <div
          className={`flex w-full max-w-[1400px] h-full ${
            isMobile ? "flex-col p-0" : "flex-row px-[60px] gap-[120px]"
          }`}
        >
          {/* Photos container */}
          <div
            className={`relative flex items-center justify-center ${
              isMobile
                ? "w-full h-[45vh] flex-shrink-0 order-2 pt-5 z-20"
                : "w-[40%] max-w-[600px] h-full flex-shrink-0 z-20"
            }`}
            style={isMobile ? { paddingLeft: "82px", paddingRight: "32px" } : {}}
          >
            <div
              className={`relative ${
                isMobile
                  ? "w-full h-full flex items-center justify-center overflow-hidden"
                  : "w-full h-[700px]"
              }`}
            >
              {sections.map((section, index) => {
                if (section.noPhoto) return null;

                const photoStyle = getPhotoStyle(index, section);

                if (section.isCardFan && section.images) {
                  return (
                    <CardFan
                      key={index}
                      images={section.images}
                      isMobile={isMobile}
                      className={`absolute ${isMobile ? "w-full h-full" : "w-[500px] h-[580px]"}`}
                      style={{
                        left: isMobile ? "50%" : section.offsetX,
                        top: isMobile ? "50%" : section.offsetY,
                        zIndex: 20 + index, // Higher z-index than text
                        willChange: "transform, opacity",
                        maxWidth: isMobile ? "calc(100vw - 114px)" : "none", // Account for container padding
                        ...photoStyle,
                      }}
                    />
                  );
                }

                if (section.image) {
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: isMobile ? "50%" : section.offsetX,
                        top: isMobile ? "50%" : section.offsetY,
                        zIndex: 20 + index, // Higher z-index than text
                        willChange: "transform, opacity",
                        maxWidth: isMobile ? "calc(100vw - 114px)" : "none", // Account for container padding
                        ...photoStyle,
                      }}
                    >
                      <Polaroid
                        src={section.image}
                        isLandscape={section.isLandscape}
                        isLarge={section.isLarge}
                        isLargeLandscape={section.isLargeLandscape}
                        rotation={isMobile ? 0 : section.rotation}
                        isMobile={isMobile}
                        photoCredit={section.photoCredit}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>

          {/* Text container */}
          <div
            ref={textContainerRef}
            className={`relative ${
              isMobile
                ? "flex-grow h-[55vh] order-1 overflow-hidden z-10"
                : "flex-1 h-full overflow-hidden z-10"
            }`}
          >
            {/* Gradient overlay at bottom of text container on mobile */}
            {isMobile && (
              <div
                className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none"
                style={{
                  height: 150,
                  background: `linear-gradient(to top, var(--color-base,#0D0D0D) 0%, var(--color-base,#0D0D0D) 40%, rgba(13,13,13,0.7) 70%, transparent 100%)`,
                }}
              />
            )}
            <div
              className="absolute w-full"
              style={
                isMobile
                  ? { height: "100%" }
                  : {
                      transform: `translateY(${35 - textProgress * (totalSections * 60)}vh)`,
                      transition: "transform 0.05s linear",
                    }
              }
            >
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    isMobile
                      ? `absolute w-full left-0 top-1/2 mb-4 justify-start ${section.highlight && section.isIntro ? "text-center justify-center" : "text-left"}`
                      : "min-h-[60vh] pr-10"
                  }`}
                  style={isMobile ? { paddingLeft: "82px", paddingRight: "32px", ...getTextTransform(index) } : {}}
                >
                  {section.highlight ? (
                    <h2
                      className={`font-heading text-[var(--color-sun,#F7C948)] uppercase whitespace-pre-line ${isMobile && section.isIntro ? "text-center w-full" : ""}`}
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "clamp(1.8rem, 6vw, 2.5rem)" : "clamp(3.5rem, 6vw, 5.5rem)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {section.highlight}
                    </h2>
                  ) : (
                    <p
                      className="text-white"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 400,
                        fontSize: isMobile ? "clamp(1rem, 3.5vw, 1.1rem)" : "clamp(1.3rem, 2vw, 1.8rem)",
                        lineHeight: 1.8,
                        maxWidth: isMobile ? "100%" : "650px",
                      }}
                    >
                      {section.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
