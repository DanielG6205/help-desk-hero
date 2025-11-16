"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiFirebase,
  SiNextdotjs,
  SiFigma,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },

  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiFigma />,
    title: "Figma",
    href: "https://www.figma.com",
  },
  {
    node: <SiFirebase />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },

  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];
/**
 * Scroll‑linked Hero section.
 *
 * Effects:
 * - First two lines ("Practice helpdesk work. Troubleshoot real computers.") fade + blur out as user scrolls.
 * - Supporting paragraph fades + blurs out in sync with them.
 * - "Be a Hero" stays pinned (via sticky) and moves slightly (subtle translate) until end of hero section.
 * - Tagline + buttons move upward (parallax) while divider line remains visually stable.
 * - Animation progress clamps 0 → 1 over the scrollable portion (hero height - viewport height).
 * - Respects prefers-reduced-motion (disables transitions / blurs).
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 normalized
  // Detect reduced motion preference (evaluated client-side each render)
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    // (Removed reduced motion ref assignment; now computed directly in render)

    function computeProgress() {
      if (!heroRef.current) return 0;
      const el = heroRef.current;
      const heroTop = el.offsetTop;
      const heroHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      // Portion where sticky is active: heroHeight - viewportHeight
      const scrollable = Math.max(heroHeight - viewportHeight, 1);

      const raw = (scrollY - heroTop) / scrollable;
      console.log(raw);
      return Math.min(1, Math.max(0, raw));
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const p = computeProgress();
        setProgress(p);
        ticking = false;
      });
    }

    function onResize() {
      // Trigger recalculation after layout changes
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Initial set
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Derived animation values
  const fadeOut = 1 - progress * 1.15; // Can go below 0; clamp in styles
  const lastFadeIn = reduceMotion
    ? 1
    : Math.min(1, Math.max(0, (progress - 0.95) / 0.05));
  const blurAmount = progress * 8; // px
  const heroDrift = progress * 32; // px downward movement for "Be a Hero"
  const miniSectionDrift = progress; // px downward movement for mini-section
  const parallaxRise = progress * 60; // px upward movement for tagline/buttons
  const dividerOpacity = 1 - progress * 0.25; // Keep strong but slight dim near end

  // Clamp helpers
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  const headingStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        opacity: clamp01(fadeOut),
        filter: `blur(${blurAmount.toFixed(2)}px)`,
        transform: `translateY(${(progress * 25).toFixed(2)}px)`,
      };

  const paragraphStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        opacity: clamp01(fadeOut),
        filter: `blur(${blurAmount.toFixed(2)}px)`,
        transform: `translateY(${(progress * 20).toFixed(2)}px)`,
      };

  const pinnedHeroStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        transform: `translateY(${heroDrift.toFixed(2)}px)`,
      };

  const miniSectionStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        transform: `translateY(${miniSectionDrift.toFixed(2)}px)`,
      };

  const parallaxGroupStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        transform: `translateY(${(-parallaxRise).toFixed(2)}px)`,
      };

  const carouselStyle: React.CSSProperties = reduceMotion
    ? {}
    : {
        opacity: lastFadeIn,
        transform: `translateY(${(-parallaxRise).toFixed(2)}px)`,
      };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[170vh] bg-black text-white overflow-visible"
      aria-label="Hero Section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3432&auto=format&fit=crop')",
          filter: "brightness(0.75)",
        }}
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px),linear-gradient(to_right,#fff_2px,transparent_2px),linear-gradient(to_bottom,#fff_2px,transparent_2px)] bg-[size:40px_40px,40px_40px,160px_160px,160px_160px] pointer-events-none" />

      {/* Sticky viewport frame */}
      <div
        className="sticky top-0 h-screen flex flex-col justify-center px-10 md:px-24 lg:px-32 transition-[transform] duration-300"
        style={miniSectionStyle}
      >
        {/* Headings block */}
        <div className="w-full">
          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-[1.08] transition-[opacity,transform,filter] duration-300"
            style={headingStyle}
          >
            Practice helpdesk work.
          </h1>
          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-[1.08] mt-2 transition-[opacity,transform,filter] duration-300"
            style={headingStyle}
          >
            Troubleshoot real computers.
          </h1>
          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg leading-[1.08] mt-4 will-change-transform transition-transform duration-300"
            style={pinnedHeroStyle}
          >
            Be a{" "}
            <span className="inline-block bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text animate-gradient-x bg-[length:200%_auto]">
              Hero
            </span>
          </h1>

          {/* Divider + secondary content (divider remains visually centered) */}
          <div
            className="mt-10 w-full border-t border-white/70 transition-opacity duration-300"
            style={{ opacity: clamp01(dividerOpacity) }}
          />
        </div>

        <div className="mt-6 w-full flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Tagline (kept uppercase as focal anchor under pinned heading) */}
          <div className="flex-1">
            <span className="block uppercase text-[12px] md:text-[13px] tracking-[0.18em] font-medium text-white/70">
              Real systems + real troubleshooting
            </span>
          </div>

          <div
            className="will-change-transform transition-transform duration-300"
            style={parallaxGroupStyle}
          >
            {/* Paragraph + CTAs */}
            <div className="flex-1 flex flex-col items-start md:items-end">
              <p
                className="text-[16px] md:text-[17px] leading-relaxed text-white/85 max-w-xl transition-[opacity,transform,filter] duration-300 text-left md:text-right"
                style={paragraphStyle}
              >
                Help Desk Hero isn’t a simulation. It’s hands‑on training with
                real virtual machines where you diagnose, repair, and learn by
                doing.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  className="px-6 py-3 rounded-xl font-medium text-white bg-transparent border border-white/30 hover:border-white/60 backdrop-blur-[2px] transition-colors duration-200"
                  aria-label="Learn concepts"
                >
                  Learn concepts
                </button>
                <Link
                  href="/problems"
                  className="px-8 py-3 rounded-xl font-semibold text-black bg-teal-300 hover:bg-teal-400 hover:shadow-[0_0_18px_#14b8a6] transition-all duration-200"
                  aria-label="Start Practicing"
                >
                  Start Practicing
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 px-10 md:px-24 lg:px-32 pb-10 z-10 transition-[opacity,transform] duration-300"
          style={carouselStyle}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-white/60 mb-3">
            Made with:
          </p>
          <div className="w-full overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={48}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Tailwind helper animation (already used in original code).
   If not defined globally, include below in a CSS file:
   .animate-gradient-x {
     animation: gradientMove 10s linear infinite;
     background-size: 200% auto;
   }
   @keyframes gradientMove {
     0% { background-position: 0% 50%; }
     100% { background-position: 200% 50%; }
   }
 */
