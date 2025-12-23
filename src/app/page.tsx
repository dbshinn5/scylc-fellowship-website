"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export default function Home() {
  // Hero refs
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  
  // Story refs
  const storyHeadingRef = useRef<HTMLHeadingElement>(null);
  
  // Converge refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const nalleliRef = useRef<HTMLDivElement>(null);
  const nalleliBioTextRef = useRef<HTMLParagraphElement>(null);
  const monicRef = useRef<HTMLDivElement>(null);
  const monicBioTextRef = useRef<HTMLParagraphElement>(null);
  
  // Puzzle quote refs
  const puzzleWrapperRef = useRef<HTMLDivElement>(null);
  const preQuoteRef = useRef<HTMLParagraphElement>(null);
  const mainQuoteRef = useRef<HTMLParagraphElement>(null);
  
  // Fellowship refs
  const fellowshipHeadingsRef = useRef<HTMLDivElement>(null);
  const fellowshipTextRef = useRef<HTMLParagraphElement>(null);
  const fellowshipImageRef = useRef<HTMLDivElement>(null);
  const fellowshipSectionRef = useRef<HTMLElement>(null);
  
  // Beliefs refs
  const beliefsHeadingRef = useRef<HTMLHeadingElement>(null);
  const beliefsSectionRef = useRef<HTMLElement>(null);
  const topicsListRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  // Overlay state
  const [showNalleliOverlay, setShowNalleliOverlay] = useState(false);
  const [showMonicOverlay, setShowMonicOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [nalleliExpanded, setNalleliExpanded] = useState(false);
  const [monicExpanded, setMonicExpanded] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hero headline animation
  useEffect(() => {
    const headline = heroHeadlineRef.current;
    if (!headline) return;

    const lines = headline.querySelectorAll(".line");
    let heroLetters: Element[] = [];

    lines.forEach((line) => {
      const text = line.textContent || "";
      const isHighlight = line.classList.contains("highlight");
      let html = "";
      for (let char of text) {
        if (char === " ") {
          html += '<span class="space"></span>';
        } else {
          html += `<span class="letter">${char}</span>`;
        }
      }
      line.innerHTML = html;

      const letters = line.querySelectorAll(".letter");
      letters.forEach((letter) => heroLetters.push(letter));
    });

    setTimeout(() => {
      heroLetters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add("visible");
        }, index * 40);
      });
    }, 1300);
  }, []);

  // Story heading animation
  useEffect(() => {
    const storyHeading = storyHeadingRef.current;
    if (!storyHeading) return;

    const storyText = storyHeading.textContent?.trim() || "";
    let storyHasRevealed = false;

    const words = storyText.split(/\s+/);
    let storyHtml = "";

    words.forEach((word, wordIndex) => {
      storyHtml += '<span class="word">';
      for (let i = 0; i < word.length; i++) {
        storyHtml += `<span class="char">${word[i]}</span>`;
      }
      storyHtml += "</span>";
      if (wordIndex < words.length - 1) {
        storyHtml += '<span class="space">&nbsp;</span>';
      }
    });

    storyHeading.innerHTML = storyHtml;
    const storyCharElements = storyHeading.querySelectorAll(".char");

    function checkStoryInView() {
      if (storyHasRevealed) return;

      const storySection = document.getElementById("story");
      if (!storySection) return;

      const storyRect = storySection.getBoundingClientRect();
      if (storyRect.top < window.innerHeight * 0.7) {
        storyHasRevealed = true;
        storyCharElements.forEach((char, index) => {
          setTimeout(() => {
            char.classList.add("revealed");
          }, 30 + index * 8);
        });
      }
    }

    window.addEventListener("scroll", checkStoryInView);
    checkStoryInView();
    return () => window.removeEventListener("scroll", checkStoryInView);
  }, []);

  // Converge animation
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    const updateConverge = () => {
      const wrapper = wrapperRef.current;
      const section = sectionRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const line3 = line3Ref.current;
      const nextContent = quoteRef.current;
      const nalleliCard = nalleliRef.current;
      const monicCard = monicRef.current;

      if (!wrapper || !section || !line1 || !line2 || !line3 || !nextContent || !nalleliCard || !monicCard) return;

      // Mobile: Static section with color change when centered in viewport
      if (isMobile) {
        const line2Rect = line2.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowMiddle = windowHeight / 2;
        
        // Check if line2 (WHO WE ARE) is centered in viewport
        const line2Center = line2Rect.top + (line2Rect.height / 2);
        const isCentered = Math.abs(line2Center - windowMiddle) < windowHeight * 0.2;
        
        // Track if color change has been triggered (once triggered, stay that way)
        if (!section.dataset.colorChanged && isCentered) {
          section.dataset.colorChanged = "true";
        }

        // Position all lines at convergence point (centered, stacked)
        [line1, line2, line3].forEach((line) => {
          line.style.transform = "translate(0, 0)";
        });

        // Apply color change if triggered (and keep it)
        if (section.dataset.colorChanged === "true" || isCentered) {
          section.style.background = "var(--color-coral)";
          [line1, line2, line3].forEach((line) => {
            line.style.background = "var(--color-coral)";
            line.style.color = "var(--color-surface)";
          });
          
          // Apply coral background to bio cards (permanent)
          nalleliCard.style.background = "var(--color-coral)";
          monicCard.style.background = "var(--color-coral)";
          
          // Apply white text to bio content
          const nalleliText = nalleliCard.querySelectorAll('h2, p, a');
          const monicText = monicCard.querySelectorAll('h2, p, a');
          nalleliText.forEach((el) => {
            (el as HTMLElement).style.color = "var(--color-surface)";
          });
          monicText.forEach((el) => {
            (el as HTMLElement).style.color = "var(--color-surface)";
          });
        } else {
          section.style.background = "var(--color-base)";
          [line1, line2, line3].forEach((line) => {
            line.style.background = "var(--color-base)";
            line.style.color = "var(--color-surface)";
          });
        }
        
        // Show all content normally (no slide animations)
        nextContent.style.transform = "translateX(0)";
        nextContent.style.opacity = "1";
        nalleliCard.style.transform = "translateX(0)";
        nalleliCard.style.opacity = "1";
        monicCard.style.transform = "translateX(0)";
        monicCard.style.opacity = "1";
        
        return;
      }
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperTop = wrapperRect.top;
      const windowHeight = window.innerHeight;
      const wrapperHeight = wrapper.offsetHeight - windowHeight;

      const triggerPoint = windowHeight * 0.9;
      const adjustedTop = wrapperTop - triggerPoint;

      let progress = -adjustedTop / (wrapperHeight - (windowHeight - triggerPoint));
      progress = Math.max(0, Math.min(1, progress));

      const horizontalProgress = Math.min(progress / 0.2, 1);
      const verticalProgress = Math.max(Math.min((progress - 0.2) / 0.2, 1), 0);
      const exitProgress = Math.max(Math.min((progress - 0.4) / 0.2, 1), 0);
      const quoteExitProgress = Math.max(Math.min((progress - 0.6) / 0.2, 1), 0);
      const nalleliExitProgress = Math.max((progress - 0.8) / 0.2, 0);

      const easedHorizontal = easeOutCubic(horizontalProgress);
      const easedVertical = easeOutCubic(verticalProgress);
      const easedExit = easeOutCubic(exitProgress);
      const easedQuoteExit = easeOutCubic(quoteExitProgress);
      const easedNalleliExit = easeOutCubic(nalleliExitProgress);

      const startOffsetX = window.innerWidth;
      const lineHeight = line1.offsetHeight;

      let line1X = startOffsetX * (1 - easedHorizontal);
      let line2X = -startOffsetX * (1 - easedHorizontal);
      let line3X = startOffsetX * (1 - easedHorizontal);

      const exitOffset = -startOffsetX * easedExit;
      line1X += exitOffset;
      line2X += exitOffset;
      line3X += exitOffset;

      const stackOffset = lineHeight * 0.9;
      const line1Y = -stackOffset * (1 - easedVertical);
      const line2Y = 0;
      const line3Y = stackOffset * (1 - easedVertical);

      line1.style.transform = `translate(${line1X}px, ${line1Y}px)`;
      line2.style.transform = `translate(${line2X}px, ${line2Y}px)`;
      line3.style.transform = `translate(${line3X}px, ${line3Y}px)`;

      const quoteEnterX = startOffsetX * (1 - easedExit);
      const quoteExitX = -startOffsetX * easedQuoteExit;
      nextContent.style.transform = `translateX(${quoteEnterX + quoteExitX}px)`;
      nextContent.style.opacity = String(easedExit * (1 - easedQuoteExit));

      const nalleliEnterX = startOffsetX * (1 - easedQuoteExit);
      const nalleliExitX = -startOffsetX * easedNalleliExit;
      nalleliCard.style.transform = `translateX(${nalleliEnterX + nalleliExitX}px)`;
      nalleliCard.style.opacity = String(easedQuoteExit * (1 - easedNalleliExit));

      const monicX = startOffsetX * (1 - easedNalleliExit);
      monicCard.style.transform = `translateX(${monicX}px)`;
      monicCard.style.opacity = String(easedNalleliExit);

      if (easedVertical >= 0.94) {
        section.style.background = "var(--color-coral)";
        [line1, line2, line3].forEach((line) => {
          line.style.background = "var(--color-coral)";
          line.style.color = "var(--color-surface)";
        });
      } else {
        section.style.background = "var(--color-base)";
        [line1, line2, line3].forEach((line) => {
          line.style.background = "var(--color-base)";
          line.style.color = "var(--color-surface)";
        });
      }
    };

    window.addEventListener("scroll", updateConverge);
    window.addEventListener("resize", updateConverge);
    updateConverge();
    return () => {
      window.removeEventListener("scroll", updateConverge);
      window.removeEventListener("resize", updateConverge);
    };
  }, []);

  // Puzzle quote animation
  useEffect(() => {
    const puzzleWrapper = puzzleWrapperRef.current;
    const preQuoteEl = preQuoteRef.current;
    const mainQuoteEl = mainQuoteRef.current;
    if (!puzzleWrapper || !preQuoteEl || !mainQuoteEl) return;

    const preQuoteText = "As my mom always says...";
    const mainQuoteText = '"This movement is like a puzzle—<em>every single person has a crucial role to play</em>. Without you, the puzzle is incomplete."';

    function wrapChars(text: string, container: HTMLElement) {
      const parts = text.split(/(<em>|<\/em>)/);
      let html = "";
      let inEmphasis = false;

      parts.forEach((part) => {
        if (part === "<em>") {
          inEmphasis = true;
          return;
        }
        if (part === "</em>") {
          inEmphasis = false;
          return;
        }

        for (let char of part) {
          if (char === " ") {
            html += " ";
          } else {
            const emphasisClass = inEmphasis ? " emphasis" : "";
            html += `<span class="char${emphasisClass}">${char}</span>`;
          }
        }
      });

      container.innerHTML = html;
      return container.querySelectorAll(".char");
    }

    const preQuoteChars = wrapChars(preQuoteText, preQuoteEl);
    const mainQuoteChars = wrapChars(mainQuoteText, mainQuoteEl);
    const allChars = [...preQuoteChars, ...mainQuoteChars];
    const preQuoteCharCount = preQuoteChars.length;

    let currentRevealIndex = 0;
    let targetRevealIndex = 0;
    let animationFrame: number | null = null;

    function updatePuzzleReveal() {
      if (!puzzleWrapper) return;
      const wrapperRect = puzzleWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = (windowHeight - wrapperRect.top) / windowHeight;
      progress = Math.max(0, Math.min(1, progress));

      if (progress < 0.15) {
        targetRevealIndex = Math.floor((progress / 0.15) * preQuoteCharCount);
      } else if (progress < 0.25) {
        targetRevealIndex = preQuoteCharCount;
      } else {
        const mainProgress = (progress - 0.25) / 0.75;
        targetRevealIndex = preQuoteCharCount + Math.floor(mainProgress * mainQuoteChars.length);
      }
    }

    function animateReveal() {
      if (currentRevealIndex < targetRevealIndex) {
        const step = Math.max(1, Math.ceil((targetRevealIndex - currentRevealIndex) * 0.3));
        currentRevealIndex = Math.min(currentRevealIndex + step, targetRevealIndex);
      } else if (currentRevealIndex > targetRevealIndex) {
        const step = Math.max(1, Math.ceil((currentRevealIndex - targetRevealIndex) * 0.3));
        currentRevealIndex = Math.max(currentRevealIndex - step, targetRevealIndex);
      }

      allChars.forEach((char, index) => {
        if (index < currentRevealIndex) {
          char.classList.add("revealed");
        } else {
          char.classList.remove("revealed");
        }
      });

      animationFrame = requestAnimationFrame(animateReveal);
    }

    window.addEventListener("scroll", updatePuzzleReveal, { passive: true });
    updatePuzzleReveal();
    animateReveal();

    return () => {
      window.removeEventListener("scroll", updatePuzzleReveal);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Fellowship animation
  useEffect(() => {
    const fellowshipHeadings = fellowshipHeadingsRef.current;
    const fellowshipText = fellowshipTextRef.current;
    const fellowshipImage = fellowshipImageRef.current;
    const fellowshipSection = fellowshipSectionRef.current;
    if (!fellowshipHeadings || !fellowshipText || !fellowshipImage || !fellowshipSection) return;

    const headings = fellowshipHeadings.querySelectorAll(".fellowship-heading");
    let allLetters: { el: Element; index: number }[] = [];

    headings.forEach((heading, headingIndex) => {
      const text = heading.textContent || "";
      let html = "";
      for (let char of text) {
        if (char === " ") {
          html += '<span class="space"></span>';
        } else {
          html += `<span class="letter">${char}</span>`;
        }
      }
      heading.innerHTML = html;

      const letters = heading.querySelectorAll(".letter");
      const offset = headingIndex === 0 ? 0 : allLetters.length;
      letters.forEach((letter, i) => {
        allLetters.push({ el: letter, index: offset + i });
      });
    });

    function wrapTextIntoLines() {
      if (!fellowshipText) return [];
      const text = fellowshipText.textContent || "";
      const words = text.split(" ");

      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "nowrap";
      tempSpan.style.font = window.getComputedStyle(fellowshipText).font;
      document.body.appendChild(tempSpan);

      const containerWidth = fellowshipText.offsetWidth;
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine ? currentLine + " " + word : word;
        tempSpan.textContent = testLine;

        if (tempSpan.offsetWidth > containerWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      document.body.removeChild(tempSpan);

      fellowshipText.innerHTML = lines.map((line) => `<span class="text-line">${line} </span>`).join("");
      return fellowshipText.querySelectorAll(".text-line");
    }

    const textLines = wrapTextIntoLines();
    let fellowshipAnimated = false;

    function checkFellowshipVisibility() {
      if (fellowshipAnimated) return;

      const rect = headings[0].getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        fellowshipAnimated = true;

        allLetters.forEach(({ el, index }) => {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 25);
        });

        const lettersDelay = allLetters.length * 25;

        setTimeout(() => {
          if (fellowshipImage) fellowshipImage.classList.add("visible");
        }, lettersDelay);

        textLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add("visible");
          }, lettersDelay + index * 80);
        });
      }
    }

    function updateFellowshipParallax() {
      if (!fellowshipImage || !fellowshipSection) return;
      
      const isMobile = window.innerWidth <= 768;
      const sectionRect = fellowshipSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far into the viewport the section is
      const sectionProgress = (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
      const clampedProgress = Math.max(0, Math.min(1, sectionProgress));
      
      let imageOffset = clampedProgress * 300;
      const maxParallax = 300;

      // On mobile, limit parallax movement to prevent overlapping TOPICS section
      if (isMobile) {
        const beliefsSection = document.getElementById("beliefs-section");
        if (beliefsSection) {
          const beliefsRect = beliefsSection.getBoundingClientRect();
          const distanceToBeliefs = beliefsRect.top - sectionRect.bottom;
          
          // Limit parallax to stop before beliefs section (with 100px buffer)
          const maxMobileOffset = Math.max(0, distanceToBeliefs - 100);
          imageOffset = Math.min(imageOffset, maxMobileOffset);
        } else {
          // If beliefs section not found, use a smaller max offset on mobile
          imageOffset = clampedProgress * 150; // Reduced from 300px to 150px
        }
      }

      // Move image down as you scroll (starts in place, moves down)
      fellowshipImage.style.transform = `translateY(${imageOffset}px)`;
    }

    // Set initial parallax position before image is visible (to prevent jump)
    updateFellowshipParallax();
    window.addEventListener("scroll", checkFellowshipVisibility, { passive: true });
    window.addEventListener("scroll", updateFellowshipParallax, { passive: true });
    checkFellowshipVisibility(); // Initial check

    return () => {
      window.removeEventListener("scroll", checkFellowshipVisibility);
      window.removeEventListener("scroll", updateFellowshipParallax);
    };
  }, []);

  // Helper function to wrap text into lines
  const wrapTextIntoLines = (textElement: HTMLParagraphElement) => {
    const text = textElement.textContent || "";
    const words = text.split(" ");

    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.style.font = window.getComputedStyle(textElement).font;
    document.body.appendChild(tempSpan);

    const containerWidth = textElement.offsetWidth;
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + " " + word : word;
      tempSpan.textContent = testLine;

      if (tempSpan.offsetWidth > containerWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    document.body.removeChild(tempSpan);

    textElement.innerHTML = lines.map((line) => `<span class="text-line">${line} </span>`).join("");
    return textElement.querySelectorAll(".text-line");
  };

  // Quote text animation
  useEffect(() => {
    const quoteText = quoteTextRef.current;
    if (!quoteText) return;

    const textLines = wrapTextIntoLines(quoteText);
    let quoteAnimated = false;

    function checkQuoteVisibility() {
      if (!quoteText || quoteAnimated) return;

      const rect = quoteText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        quoteAnimated = true;

        textLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add("visible");
          }, index * 80);
        });
      }
    }

    window.addEventListener("scroll", checkQuoteVisibility, { passive: true });
    checkQuoteVisibility();

    return () => {
      window.removeEventListener("scroll", checkQuoteVisibility);
    };
  }, []);

  // Nalleli bio text animation
  useEffect(() => {
    const nalleliBioText = nalleliBioTextRef.current;
    if (!nalleliBioText) return;

    const textLines = wrapTextIntoLines(nalleliBioText);
    let nalleliAnimated = false;

    function checkNalleliVisibility() {
      if (!nalleliBioText || nalleliAnimated) return;

      const rect = nalleliBioText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        nalleliAnimated = true;

        textLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add("visible");
          }, index * 80);
        });
      }
    }

    window.addEventListener("scroll", checkNalleliVisibility, { passive: true });
    checkNalleliVisibility();

    return () => {
      window.removeEventListener("scroll", checkNalleliVisibility);
    };
  }, []);

  // Monic bio text animation
  useEffect(() => {
    const monicBioText = monicBioTextRef.current;
    if (!monicBioText) return;

    const textLines = wrapTextIntoLines(monicBioText);
    let monicAnimated = false;

    function checkMonicVisibility() {
      if (!monicBioText || monicAnimated) return;

      const rect = monicBioText.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        monicAnimated = true;

        textLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add("visible");
          }, index * 80);
        });
      }
    }

    window.addEventListener("scroll", checkMonicVisibility, { passive: true });
    checkMonicVisibility();

    return () => {
      window.removeEventListener("scroll", checkMonicVisibility);
    };
  }, []);

  // Beliefs animation
  useEffect(() => {
    const beliefsHeading = beliefsHeadingRef.current;
    const beliefsSection = beliefsSectionRef.current;
    if (!beliefsHeading || !beliefsSection) return;

    const beliefsText = beliefsHeading.textContent || "";
    let beliefsHtml = "";
    for (let char of beliefsText) {
      if (char === " ") {
        beliefsHtml += '<span class="space"></span>';
      } else {
        beliefsHtml += `<span class="letter">${char}</span>`;
      }
    }
    beliefsHeading.innerHTML = beliefsHtml;
    const beliefsLetters = beliefsHeading.querySelectorAll(".letter");
    const topicsList = topicsListRef.current;
    // Get all direct children divs which are the topic items
    const topicItems = topicsList ? Array.from(topicsList.children) : [];
    const fellowshipSection = fellowshipSectionRef.current;

    let beliefsAnimated = false;

    function checkBeliefsVisibility() {
      if (!beliefsHeading) return;
      const rect = beliefsHeading.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8 && !beliefsAnimated) {
        beliefsAnimated = true;

        beliefsLetters.forEach((letter, index) => {
          setTimeout(() => {
            letter.classList.add("visible");
          }, index * 30);
        });

        const lettersDelay = beliefsLetters.length * 30;
        setTimeout(() => {
          if (beliefsSection) beliefsSection.classList.add("colorShift");
          if (fellowshipSection) fellowshipSection.classList.add("colorShift");
          if (footerRef.current) footerRef.current.classList.add("colorShift");
        }, lettersDelay + 100);

        topicItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible");
          }, lettersDelay + 200 + index * 50);
        });
      }

      if (rect.top >= windowHeight * 0.8 && beliefsAnimated) {
        beliefsAnimated = false;
        beliefsLetters.forEach((letter) => letter.classList.remove("visible"));
        if (beliefsSection) beliefsSection.classList.remove("colorShift");
        if (fellowshipSection) fellowshipSection.classList.remove("colorShift");
        if (footerRef.current) footerRef.current.classList.remove("colorShift");
        topicItems.forEach((item) => item.classList.remove("visible"));
      }
    }

    window.addEventListener("scroll", checkBeliefsVisibility, { passive: true });
    checkBeliefsVisibility();

    return () => window.removeEventListener("scroll", checkBeliefsVisibility);
  }, []);

  return (
    <>
      <Sidebar />
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.hero} id="hero">
          <div className={styles.heroBackground}>
            <img src="/images/who-we-are/youngnallelispeaking.webp" alt="Youth climate activist speaking passionately at rally" />
          </div>

          <nav className={styles.navStrip}>
            <div className={styles.logo}>
              <img src="https://raw.githubusercontent.com/dbshinn5/SCYLCF/refs/heads/main/SCYLCF_logo.png" alt="SCYLCF Logo" className={styles.logoIcon} />
            </div>
          </nav>

          <div className={styles.heroContent}>
            <div className={styles.headlineWrapper}>
              <div className={styles.fellowshipBadge}>2026 Fellowship Application</div>
              <h1 className={styles.headline} ref={heroHeadlineRef}>
                <span className="line">EQUIPPING</span>
                <span className="line highlight">LA YOUTH</span>
                <span className="line">TO LEAD IN</span>
                <span className="line">CLIMATE ACTION</span>
          </h1>
              <div className={styles.headlineUnderline}></div>
              <div className={styles.ctaButtons}>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWdtM2nb8phwIPIFMmwbT_zMzTErtuxOe9ZSV1WjjrGQk52A/viewform" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Apply Now</a>
                <a href="#fellowship-details" className={styles.btnOutline}>Fellowship Details</a>
              </div>
            </div>
          </div>

          <div className={styles.bottomStrip}>
            <div className={styles.location}>Los Angeles, CA</div>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/scylcfellowship/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="mailto:info@scylcfellowship.org">Contact</a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.story} id="story">
          <div className={styles.storyBackground}>
            <img src="https://raw.githubusercontent.com/dbshinn5/SCYLCF/main/SCYLCF_WH3.png" alt="Climate activist" />
          </div>
          <div className={styles.storyContainer}>
            <h2 className={styles.storyHeading} ref={storyHeadingRef}>
              Our mission is to empower the next generation to drive climate innovation, by giving them the knowledge, tools and confidence to create change in their communities.
            </h2>
          </div>
        </section>

        {/* WHO WE ARE Converge Section */}
        <div className={styles.convergeWrapper} id="converge-wrapper" ref={wrapperRef}>
          <section className={styles.convergeSection} id="converge-section" ref={sectionRef}>
            <div className={styles.convergeTextContainer}>
              <div className={`${styles.convergeLine} ${styles.line1}`} ref={line1Ref}>
                WHO WE ARE
              </div>
              <div className={`${styles.convergeLine} ${styles.line2}`} ref={line2Ref}>
                WHO WE ARE
              </div>
              <div className={`${styles.convergeLine} ${styles.line3}`} ref={line3Ref}>
                WHO WE ARE
              </div>

              <div className={styles.quoteCard} ref={quoteRef}>
                <div className={styles.polaroid}>
                  <div className={styles.polaroidInner}>
                    <img src="/images/who-we-are/SCYLCF_WH3.webp" alt="Nalleli and Monica" />
                  </div>
                </div>
                <div className={styles.quoteContent}>
                  <span className={styles.quoteMark}>&quot;</span>
                  <p className={styles.quoteText} ref={quoteTextRef}>
                    We are a mother-daughter duo who have spent the last 15 years fighting to end urban oil extraction in Los Angeles and across California. We are channeling that shared passion into the SCYLC Fellowship.
                  </p>
                  <div className={styles.attribution}>
                    <div className={styles.names}>Nalleli Cobo & Monic Uriarte</div>
                    <div className={styles.role}>Founders, SCYLC Fellowship</div>
                  </div>
                </div>
              </div>

              <div className={styles.bioCard} ref={nalleliRef}>
                <div className={styles.bioTextCol}>
                  <h2 className={styles.bioName}>
                    Nalleli <span>Cobo</span>
                  </h2>
                  <p className={styles.bioTitle}>Founder & Co-Director</p>
                  <div className={styles.bioText} ref={nalleliBioTextRef}>
                    {nalleliExpanded && isMobile ? (
                      <>
                        <p>
                          Nalleli Cobo is an environmental justice activist and storyteller who led a grassroots campaign to permanently shut down a toxic oil-drilling site in her community in March 2020 at the age of 19—an oil site that caused serious health issues for her and others. Her organizing against urban oil extraction has yielded major policy movement within the Los Angeles City Council and Los Angeles County Board of Supervisors, which voted unanimously on bans of new oil exploration and phasing out existing sites.
                        </p>
                        <p>
                          Nalleli, 22, grew up in South Los Angeles and launched her activism as a 9-year-old after noticing foul smells emanating from the oil well across the street from her home. Over the years, she endured headaches, nosebleeds, and heart palpitations caused by pollution from the well. She began attending meetings and rallies with her mother and, at the age of 9, gave her first public speech on the issue. Even as a child, her skills as an orator caught others' attention and paved the way for her to eventually become the leading spokesperson for banning oil extraction in Los Angeles.
                        </p>
                        <p>
                          She co-founded People Not Pozos, which aims to secure a safe and healthy neighborhood, and the South Central Youth Leadership Coalition, which focuses on environmental racism in the community. In March 2020, Nalleli's tireless organizing culminated in the definitive closure of the AllenCo drilling site across the street from her childhood home. In addition, thanks to her work, AllenCo executives are facing over 24 criminal charges for environmental health and safety violations. Moreover, Nalleli's leadership spurred preliminary votes in the City Council in favor of banning oil extraction in the city in 2020.
                        </p>
                        <p>
                          She was diagnosed with cancer at the age of 19. After three surgeries and medical treatment, she was declared cancer-free but cannot have children as a result of her illness. In the end, Nalleli led a citizens' movement that shut down an oil drilling site and initiated the process to phase out the largest urban oil field in the US.
                        </p>
                        <p>
                          Nalleli's story and leadership also inspired the enactment of SB 1137, which bans all new oil wells within 3,200 feet of communities in California. Nalleli won the 2022 Goldman Environmental Prize, was named on the 2022 Time 100 Next list, California Energy Commission Hall of Fame, Activist of the Year, Agente de Cambio, and more.
                        </p>
                      </>
                    ) : (
                      <p>Nalleli Cobo is a South Los Angeles environmental justice activist who helped shut down a toxic urban oil-drilling site at age 19 and sparked major policy changes banning new oil extraction across the city and county. A Goldman Environmental Prize winner, she continues to lead movements against environmental racism and for community health.</p>
                    )}
                  </div>
                  <a 
                    href="javascript:void(0)" 
                    className={styles.bioLink}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isMobile) {
                        setNalleliExpanded(!nalleliExpanded);
                      } else {
                        setShowNalleliOverlay(true);
                      }
                      return false;
                    }}
                  >
                    About Nalleli
                    {isMobile && (
                      <span className={styles.expandIndicator}>
                        {nalleliExpanded ? '▲' : '▼'}
                      </span>
                    )}
                  </a>
                </div>
                <div className={styles.bioImageCol}>
                  <div className={styles.polaroid}>
                    <div className={styles.polaroidInner}>
                      <img src="/images/who-we-are/Nalleli headshot 1.webp" alt="Nalleli Cobo" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.bioCard} ${monicExpanded && isMobile ? styles.expanded : ""}`} ref={monicRef}>
                <div className={styles.bioTextCol}>
                  <h2 className={styles.bioName}>
                    Monic <span>Uriarte</span>
                  </h2>
                  <p className={styles.bioTitle}>Co-Director</p>
                  <div className={styles.bioText} ref={monicBioTextRef}>
                    {monicExpanded && isMobile ? (
                      <>
                        <p>
                          Monic Uriarte has been a tireless advocate for environmental justice, community health, and human rights in South Los Angeles for nearly three decades. Since 1998, she has served as a Community Health Promoter, where her lifelong passion for helping others has driven her to create tangible change in the lives of residents most impacted by environmental and health inequities. As an early leader in the Healthy Homes Project, Monic combined her background as a teacher and her skills as a Health Educator to help families identify and address household hazards, empowering them with knowledge to live in healthier, safer environments.
                        </p>
                        <p>
                          Monic's environmental justice work is most powerfully reflected in her co-founding of People Not Pozos a community-led coalition formed in response to the dangerous oil drilling operations located in her own neighborhood. Under her leadership, People Not Pozos mobilized residents, built partnerships with health and environmental organizations, and successfully campaigned to shut down a nearby AllenCo Energy oil site after years of community exposure to toxic emissions. Her unwavering advocacy not only brought local relief but also helped lay the foundation for broader systemic change.
                        </p>
                        <p>
                          Monic's grassroots efforts contributed to landmark victories, including the passage of SB 1137, a California law establishing health and safety buffer zones between oil wells and sensitive sites such as homes, schools, and hospitals. She also played a vital role in the successful City and County of Los Angeles motions to phase out urban oil drilling, protecting countless families from future environmental harm.
                        </p>
                        <p>
                          Today, as Director of Health Programs at Esperanza Community Housing, Monic continues to lead with compassion and purpose—advancing health equity, environmental sustainability, and justice for all Angelenos. Her leadership remains a beacon of hope and empowerment in the ongoing fight for healthy, thriving communities.
                        </p>
                      </>
                    ) : (
                      <p>Monica Uriarte is a longtime South Los Angeles environmental justice advocate and co-founder of People Not Pozos, where she helped lead the successful campaign to shut down the toxic AllenCo oil site and advance major city, county, and state protections against urban drilling. She now serves as Director of Health Programs at Esperanza Community Housing, continuing her work for community health and environmental justice.</p>
                    )}
                  </div>
                  <a 
                    href="javascript:void(0)" 
                    className={styles.bioLink}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isMobile) {
                        setMonicExpanded(!monicExpanded);
                      } else {
                        setShowMonicOverlay(true);
                      }
                      return false;
                    }}
                  >
                    About Monic
                    {isMobile && (
                      <span className={styles.expandIndicator}>
                        {monicExpanded ? '▲' : '▼'}
                      </span>
                    )}
                  </a>
                </div>
                <div className={styles.bioImageCol}>
                  <div className={styles.polaroid}>
                    <div className={styles.polaroidInner}>
                      <img src="/images/who-we-are/Monic_speakershot.webp" alt="Monica Uriarte" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Puzzle Quote Section */}
        <div className={styles.puzzleWrapper} id="puzzle-wrapper" ref={puzzleWrapperRef}>
          <section className={styles.concept3} id="puzzle-section">
            <div className={styles.concept3Inner}>
              <p className={styles.preQuote} ref={preQuoteRef}></p>
              <p className={styles.mainQuote} ref={mainQuoteRef}></p>
              <p className={`${styles.quoteAttribution} ${styles.fadeElement}`}>Monic Uriarte</p>
              <span className={styles.bigQuoteMark}>&quot;</span>
            </div>
          </section>
        </div>

        {/* Fellowship Details Section */}
        <section className={styles.fellowshipDetails} id="fellowship-details" ref={fellowshipSectionRef}>
          <div className={styles.fellowshipContent}>
            <div className={styles.fellowshipHeadings} ref={fellowshipHeadingsRef}>
              <h2 className="fellowship-heading">Fellowship</h2>
              <h2 className="fellowship-heading fellowship-heading-2">Details</h2>
            </div>
            <div className={styles.fellowshipBottomRow}>
              <p className={styles.fellowshipTextContainer} ref={fellowshipTextRef}>
                Designed for youth ages 18-25 in the Los Angeles area, this 10-month fellowship offers bi-weekly, in-person workshops led by experts in the movement (with hybrid options as needed) held on Saturdays from 12–3 PM, starting February 7, 2026, at the Mercado La Paloma, with the GIS course held weekly to give fellows more hands-on practice, which begins August 8, 2026.
              </p>
              <div className={styles.fellowshipImage} ref={fellowshipImageRef}>
                <div className={styles.polaroid}>
                  <div className={styles.polaroidInner}>
                    <img src="/images/who-we-are/NC_Standingfist.webp" alt="Nalleli Cobo standing with fist raised" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beliefs Section */}
        <section className={styles.beliefsSection} id="beliefs-section" ref={beliefsSectionRef}>
          <div className={styles.beliefsContent}>
            <div className={styles.beliefsHeaderRow}>
              <h2 className={styles.beliefsHeading} ref={beliefsHeadingRef}>Topics</h2>
            </div>
            <div className={styles.topicsList} ref={topicsListRef}>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Campaign Building</h3>
                <p className={styles.topicPresenter}>Chris Lehman | NextGen Policy</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Climate Policy</h3>
                <p className={styles.topicPresenter}>Andrea Vidaurre | The People&apos;s Collective for Environmental Justice</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Health and Climate</h3>
                <p className={styles.topicPresenter}>Dr. Tara Benesh</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Community Organizing</h3>
                <p className={styles.topicPresenter}>mark! Lopez | East Yard Communities for Environmental Justice</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Civic Engagement</h3>
                <p className={styles.topicPresenter}>Caleb Rabinowitz | Chief of Staff to Assembly Member Isaac Bryan</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Running for Office</h3>
                <p className={styles.topicPresenter}>Nathan Castillo | Elect.org</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Clean Energy</h3>
                <p className={styles.topicPresenter}>Climate Reality Project</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Public Speaking and Storytelling</h3>
                <p className={styles.topicPresenter}>Aimee Dewing | Environmental Working Group</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>Ocean Conservation</h3>
                <p className={styles.topicPresenter}>Bodhi Patil | Innerlight</p>
              </div>
              <div className={styles.topicItem}>
                <h3 className={styles.topicTitle}>GIS Mapping</h3>
                <p className={styles.topicPresenter}>CDLS | UCLA</p>
              </div>
              <div className={`${styles.topicItem} ${styles.highlight}`}>
                <h3 className={styles.topicTitle}>And More!</h3>
                <div className={styles.highlightContent}>
                  <p className={styles.topicPresenter}>
                    Fellows will receive a $5,000 stipend and, upon completing the program, will have the opportunity to apply for seed funding to launch their own community impact projects.
                  </p>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWdtM2nb8phwIPIFMmwbT_zMzTErtuxOe9ZSV1WjjrGQk52A/viewform" target="_blank" rel="noopener noreferrer" className={styles.applyCta}>Apply Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.siteFooter} ref={footerRef}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <h3 className={styles.footerTitle}>SCYLC FELLOWSHIP</h3>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.footerContact}>
                <h4 className={styles.footerHeading}>CONTACT</h4>
                <a href="mailto:info@scylcfellowship.org" className={styles.footerEmail}>info@scylcfellowship.org</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerCopyright}>&copy; 2025 South Central Youth Leadership Coalition Fellowship. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* Nalleli Bio Overlay */}
      {showNalleliOverlay && !isMobile && (
        <div 
          className={styles.overlay}
          onClick={() => setShowNalleliOverlay(false)}
        >
          <div 
            className={styles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.overlayClose}
              onClick={() => setShowNalleliOverlay(false)}
              aria-label="Close overlay"
            >
              ×
            </button>
            <div className={styles.bioCard}>
              <div className={styles.bioHeaderRow}>
                <div className={styles.bioTextCol}>
                  <h2 className={styles.bioName}>
                    Nalleli <span>Cobo</span>
                  </h2>
                  <p className={styles.bioTitle}>Founder & Co-Director</p>
                </div>
                <div className={styles.bioImageCol}>
                  <div className={styles.polaroid}>
                    <div className={styles.polaroidInner}>
                      <img src="/images/who-we-are/Nalleli headshot 1.webp" alt="Nalleli Cobo" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.bioTextCol}>
                <div className={styles.bioText}>
                  <p>
                    Nalleli Cobo is an environmental justice activist and storyteller who led a grassroots campaign to permanently shut down a toxic oil-drilling site in her community in March 2020 at the age of 19—an oil site that caused serious health issues for her and others. Her organizing against urban oil extraction has yielded major policy movement within the Los Angeles City Council and Los Angeles County Board of Supervisors, which voted unanimously on bans of new oil exploration and phasing out existing sites.
                  </p>
                  <p>
                    Nalleli, 22, grew up in South Los Angeles and launched her activism as a 9-year-old after noticing foul smells emanating from the oil well across the street from her home. Over the years, she endured headaches, nosebleeds, and heart palpitations caused by pollution from the well. She began attending meetings and rallies with her mother and, at the age of 9, gave her first public speech on the issue. Even as a child, her skills as an orator caught others' attention and paved the way for her to eventually become the leading spokesperson for banning oil extraction in Los Angeles.
                  </p>
                  <p>
                    She co-founded People Not Pozos, which aims to secure a safe and healthy neighborhood, and the South Central Youth Leadership Coalition, which focuses on environmental racism in the community. In March 2020, Nalleli's tireless organizing culminated in the definitive closure of the AllenCo drilling site across the street from her childhood home. In addition, thanks to her work, AllenCo executives are facing over 24 criminal charges for environmental health and safety violations. Moreover, Nalleli's leadership spurred preliminary votes in the City Council in favor of banning oil extraction in the city in 2020.
                  </p>
                  <p>
                    She was diagnosed with cancer at the age of 19. After three surgeries and medical treatment, she was declared cancer-free but cannot have children as a result of her illness. In the end, Nalleli led a citizens' movement that shut down an oil drilling site and initiated the process to phase out the largest urban oil field in the US.
                  </p>
                  <p>
                    Nalleli's story and leadership also inspired the enactment of SB 1137, which bans all new oil wells within 3,200 feet of communities in California. Nalleli won the 2022 Goldman Environmental Prize, was named on the 2022 Time 100 Next list, California Energy Commission Hall of Fame, Activist of the Year, Agente de Cambio, and more.
                  </p>
                </div>
              </div>
            </div>
            {/* Gradient overlay at bottom of popup box */}
            <div
              className={styles.overlayGradient}
            />
          </div>
        </div>
      )}

      {/* Monic Bio Overlay - Desktop only */}
      {showMonicOverlay && !isMobile && (
        <>
          {/* Gradient overlay at bottom of viewport */}
          <div
            className={styles.overlayGradient}
          />
          <div 
            className={styles.overlay}
            onClick={() => setShowMonicOverlay(false)}
          >
            <div 
              className={styles.overlayContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.overlayClose}
                onClick={() => setShowMonicOverlay(false)}
                aria-label="Close overlay"
              >
                ×
              </button>
              <div className={styles.bioCard}>
                <div className={styles.bioHeaderRow}>
                  <div className={styles.bioTextCol}>
                    <h2 className={styles.bioName}>
                      Monic <span>Uriarte</span>
                    </h2>
                    <p className={styles.bioTitle}>Co-Director</p>
                  </div>
                  <div className={styles.bioImageCol}>
                    <div className={styles.polaroid}>
                      <div className={styles.polaroidInner}>
                        <img src="/images/who-we-are/Monic_speakershot.webp" alt="Monica Uriarte" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.bioTextCol}>
                  <div className={styles.bioText}>
                    <p>
                      Monic Uriarte has been a tireless advocate for environmental justice, community health, and human rights in South Los Angeles for nearly three decades. Since 1998, she has served as a Community Health Promoter, where her lifelong passion for helping others has driven her to create tangible change in the lives of residents most impacted by environmental and health inequities. As an early leader in the Healthy Homes Project, Monic combined her background as a teacher and her skills as a Health Educator to help families identify and address household hazards, empowering them with knowledge to live in healthier, safer environments.
                    </p>
                    <p>
                      Monic's environmental justice work is most powerfully reflected in her co-founding of People Not Pozos a community-led coalition formed in response to the dangerous oil drilling operations located in her own neighborhood. Under her leadership, People Not Pozos mobilized residents, built partnerships with health and environmental organizations, and successfully campaigned to shut down a nearby AllenCo Energy oil site after years of community exposure to toxic emissions. Her unwavering advocacy not only brought local relief but also helped lay the foundation for broader systemic change.
                    </p>
                    <p>
                      Monic's grassroots efforts contributed to landmark victories, including the passage of SB 1137, a California law establishing health and safety buffer zones between oil wells and sensitive sites such as homes, schools, and hospitals. She also played a vital role in the successful City and County of Los Angeles motions to phase out urban oil drilling, protecting countless families from future environmental harm.
                    </p>
                    <p>
                      Today, as Director of Health Programs at Esperanza Community Housing, Monic continues to lead with compassion and purpose—advancing health equity, environmental sustainability, and justice for all Angelenos. Her leadership remains a beacon of hope and empowerment in the ongoing fight for healthy, thriving communities.
                    </p>
                  </div>
                </div>
              </div>
              {/* Gradient overlay at bottom of popup box */}
              <div
                className={styles.overlayGradient}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
