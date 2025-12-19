"use client";

import { useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const sidebarRef = useRef<HTMLElement>(null);
  const navItemsRef = useRef<NodeListOf<Element> | null>(null);

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

    const navItems = sidebar.querySelectorAll(".sidebar-nav-item");
    navItemsRef.current = navItems;

    function updateSidebarActive() {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let activeIndex = 0;

      sections.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          activeIndex = i;
        }
      });

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
    <nav className={styles.leftSidebar} ref={sidebarRef}>
      <div className={styles.sidebarHamburger}>
        <span></span>
        <span></span>
      </div>
      <div className={styles.sidebarNav}>
        <a href="#hero" className={`${styles.sidebarNavItem} ${styles.active}`}>
          <span className={styles.navNumber}>I</span>
          <span className={styles.navTitle}>Home</span>
        </a>
        <a href="#story" className={styles.sidebarNavItem}>
          <span className={styles.navNumber}>II</span>
          <span className={styles.navTitle}>Mission</span>
        </a>
        <a href="#converge-wrapper" className={styles.sidebarNavItem}>
          <span className={styles.navNumber}>III</span>
          <span className={styles.navTitle}>Who We Are</span>
        </a>
        <a href="#fellowship-details" className={`${styles.sidebarNavItem} ${styles.highlight}`}>
          <span className={styles.navNumber}>IV</span>
          <span className={styles.navTitle}>Fellowship</span>
        </a>
        <a href="#beliefs-section" className={styles.sidebarNavItem}>
          <span className={styles.navNumber}>V</span>
          <span className={styles.navTitle}>Topics</span>
        </a>
      </div>
      <a href="#" className={styles.sidebarCta}>
        Apply Now
      </a>
    </nav>
  );
}

