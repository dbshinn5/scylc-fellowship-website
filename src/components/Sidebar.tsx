"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const sidebarRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<Element[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isStoryPage = pathname === "/story";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const sections = [
      { id: "hero", index: 0 },
      { id: "story", index: 1 },
      { id: "converge-wrapper", index: 2 },
      { id: "fellowship-details", index: 3 },
      { id: "beliefs-section", index: 4 },
    ];

    // Get nav items using the ref
    const navContainer = navContainerRef.current;
    const navItems = navContainer ? Array.from(navContainer.children) : [];
    navItemsRef.current = navItems as Element[];

    function updateSidebarActive() {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportMiddle = scrollPos + windowHeight / 2;
      let activeIndex = -1; // Start with no active section
      let maxVisibleArea = 0;

      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const sectionTop = scrollPos + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        // Calculate how much of the section is visible in viewport
        const visibleTop = Math.max(sectionTop, scrollPos);
        const visibleBottom = Math.min(sectionBottom, scrollPos + windowHeight);
        const visibleArea = Math.max(0, visibleBottom - visibleTop);
        
        // Check if viewport middle is within this section
        const isInSection = viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom;
        
        // For hero section (index 0), only activate if it's actually in view
        if (i === 0) {
          // Hero section must be in viewport and viewport middle should be within it
          if (rect.top < windowHeight && rect.bottom > 0 && isInSection) {
            if (activeIndex === -1 || isInSection) {
              activeIndex = i;
              maxVisibleArea = visibleArea;
            }
          }
        } else {
          // For other sections, use the existing logic
          if (isInSection || (visibleArea > maxVisibleArea && visibleArea > windowHeight * 0.3)) {
            activeIndex = i;
            maxVisibleArea = visibleArea;
          }
        }
      });

      // If no section is active and we're at the top, activate hero
      if (activeIndex === -1 && scrollPos < 100) {
        activeIndex = 0;
      }

      navItems.forEach((item, i) => {
        if (i === activeIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      updateSidebarTheme();
    }

    function updateSidebarTheme() {
      if (!sidebar) return;
      sidebar.classList.remove("themeCoral", "themeTeal");

      const convergeSectionEl = document.getElementById("converge-section");
      if (convergeSectionEl) {
        const convergeStyle = window.getComputedStyle(convergeSectionEl);
        const convergeRect = convergeSectionEl.getBoundingClientRect();

        if (
          convergeStyle.backgroundColor.includes("217, 68, 53") ||
          convergeStyle.background.includes("--color-coral") ||
          convergeSectionEl.style.background === "var(--color-coral)"
        ) {
          if (convergeRect.top < window.innerHeight && convergeRect.bottom > 0) {
            sidebar.classList.add("themeCoral");
            return;
          }
        }
      }

      // Check if beliefs section (Topics) is in view - trigger teal theme when heading is visible
      const beliefsSection = document.getElementById("beliefs-section");
      const beliefsHeading = beliefsSection?.querySelector("h2");
      
      if (beliefsSection && beliefsHeading) {
        const beliefsRect = beliefsHeading.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // When the heading is 80% into viewport (same trigger as the animation)
        if (beliefsRect.top < windowHeight * 0.8) {
          sidebar.classList.add("themeTeal");
          return;
        }
      }

      // Fallback: check for colorShift class if above check doesn't work
      const fellowshipSection = document.getElementById("fellowship-details");
      if (
        fellowshipSection?.classList.contains("colorShift") ||
        beliefsSection?.classList.contains("colorShift")
      ) {
        const fellowshipRect = fellowshipSection?.getBoundingClientRect();
        const beliefsRect = beliefsSection?.getBoundingClientRect();

        if (
          fellowshipRect &&
          beliefsRect &&
          fellowshipRect.top < window.innerHeight &&
          beliefsRect.bottom > 0
        ) {
          sidebar.classList.add("themeTeal");
        }
      }
    }

    window.addEventListener("scroll", updateSidebarActive, { passive: true });
    updateSidebarActive();

    return () => {
      window.removeEventListener("scroll", updateSidebarActive);
    };
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div 
          className={styles.menuOverlay}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <nav className={styles.leftSidebar} ref={sidebarRef}>
        <div 
          className={`${styles.sidebarHamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
        </div>
        <div className={`${styles.sidebarNav} ${isMenuOpen ? styles.menuOpen : ""}`} ref={navContainerRef}>
        <Link href={isStoryPage ? "/#hero" : "#hero"} className={styles.sidebarNavItem} onClick={handleLinkClick}>
          <span className={styles.navNumber}>I</span>
          <span className={styles.navTitle}>Home</span>
        </Link>
        <Link href={isStoryPage ? "/#story" : "#story"} className={styles.sidebarNavItem} onClick={handleLinkClick}>
          <span className={styles.navNumber}>II</span>
          <span className={styles.navTitle}>Mission</span>
        </Link>
        <Link href={isStoryPage ? "/#converge-wrapper" : "#converge-wrapper"} className={styles.sidebarNavItem} onClick={handleLinkClick}>
          <span className={styles.navNumber}>III</span>
          <span className={styles.navTitle}>Who We Are</span>
        </Link>
        <Link href={isStoryPage ? "/#fellowship-details" : "#fellowship-details"} className={`${styles.sidebarNavItem} ${styles.highlight}`} onClick={handleLinkClick}>
          <span className={styles.navNumber}>IV</span>
          <span className={styles.navTitle}>Fellowship</span>
        </Link>
        <Link href={isStoryPage ? "/#beliefs-section" : "#beliefs-section"} className={styles.sidebarNavItem} onClick={handleLinkClick}>
          <span className={styles.navNumber}>V</span>
          <span className={styles.navTitle}>Topics</span>
        </Link>
        <Link href="/story" className={styles.sidebarNavItem} onClick={handleLinkClick}>
          <span className={styles.navNumber}>VI</span>
          <span className={styles.navTitle}>Our Story</span>
        </Link>
      </div>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWdtM2nb8phwIPIFMmwbT_zMzTErtuxOe9ZSV1WjjrGQk52A/viewform" target="_blank" rel="noopener noreferrer" className={styles.sidebarCta}>
          Apply Now
        </a>
      </nav>
    </>
  );
}

