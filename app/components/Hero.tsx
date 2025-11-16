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
  { node: <SiReact />, title: "React" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiFirebase />, title: "Firebase" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Track scroll for fade/blur ONLY
  useEffect(() => {
    function computeProgress() {
      if (!heroRef.current) return 0;

      const el = heroRef.current;
      const heroTop = el.offsetTop;
      const heroHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const scrollable = Math.max(heroHeight - viewportHeight, 1);
      return Math.min(1, Math.max(0, (scrollY - heroTop) / scrollable));
    }

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setProgress(computeProgress());
          ticking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fadeOut = 1 - progress * 1.15;
  const blurAmount = progress * 8;
  const parallaxRise = progress * 60;

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  // NO SCROLL MOVEMENT, ONLY FADE + BLUR
  const headingStyle = reduceMotion
    ? {}
    : {
        opacity: clamp01(fadeOut),
        filter: `blur(${blurAmount}px)`,
      };

  const paragraphStyle = reduceMotion
    ? {}
    : {
        opacity: clamp01(fadeOut),
        filter: `blur(${blurAmount}px)`,
      };

  // No drift — stays fixed size + position
  const pinnedHeroStyle = {};

  const parallaxGroupStyle = reduceMotion
    ? {}
    : {
        transform: `translateY(${-parallaxRise}px)`,
      };

  const carouselStyle = reduceMotion
    ? {}
    : {
        opacity: clamp01((progress - 0.9) / 0.1),
        transform: `translateY(${-parallaxRise}px)`,
      };

  return (
    <section
      ref={heroRef}
      className="
        relative w-full h-[170vh] bg-black text-white overflow-visible
        text-[clamp(12px,1.1vw,16px)]
      "
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3432&auto=format&fit=crop')",
          filter: "brightness(0.75)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85" />
      <div
        className="absolute inset-0 opacity-[0.07]
        bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
        bg-[size:40px_40px] pointer-events-none"
      />

      {/* CONTENT */}
      <div
        className="
          sticky top-0 h-screen
          flex flex-col justify-between
          px-[clamp(1rem,4vw,8rem)]
          py-[clamp(2rem,4vw,5rem)]
        "
      >
        {/* TOP TEXT */}
        <div className="mt-10">
          <h1
            className="
              font-extrabold leading-tight drop-shadow-lg
              text-[clamp(2rem,6vw,4.5rem)]
            "
            style={headingStyle}
          >
            Practice helpdesk work.
          </h1>

          <h1
            className="
              font-extrabold mt-2 leading-tight drop-shadow-lg
              text-[clamp(2rem,6vw,4.5rem)]
            "
            style={headingStyle}
          >
            Troubleshoot real computers.
          </h1>

          <h1
            className="
              font-extrabold mt-4 leading-tight drop-shadow-lg
              text-[clamp(2rem,6vw,4.5rem)]
            "
            style={pinnedHeroStyle}
          >
            Be a{" "}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
              Hero
            </span>
          </h1>

          <div className="border-t border-white/60 mt-6" />
        </div>

        {/* MIDDLE TEXT */}
        <div style={parallaxGroupStyle}>
          <p
            className="
              max-w-xl ml-auto text-right
              text-[clamp(0.9rem,1.5vw,1.1rem)]
              text-white/85 leading-relaxed
            "
            style={paragraphStyle}
          >
            Help Desk Hero isn’t a simulation. It’s real hands-on training with
            virtual machines where you diagnose, repair, and learn by doing.
          </p>

          <div className="mt-5 flex gap-3 justify-end">
            <Link
              href="/learn"
              className="
                px-[clamp(0.8rem,2vw,1.2rem)]
                py-[clamp(0.4rem,1vw,0.8rem)]
                rounded-xl border border-white/30
                hover:border-white/60 transition
                text-[clamp(0.8rem,1.2vw,1rem)]
              "
            >
              Learn Concepts
            </Link>

            <Link
              href="/labs"
              className="
                px-[clamp(1rem,2.4vw,1.6rem)]
                py-[clamp(0.5rem,1.1vw,0.9rem)]
                bg-teal-300 text-black rounded-xl
                font-semibold hover:bg-teal-400 transition
                text-[clamp(0.8rem,1.2vw,1rem)]
              "
            >
              Start Practicing
            </Link>
          </div>
        </div>

        {/* TECHNOLOGY LOGO LOOP */}
        <div
          className="pb-[clamp(0.5rem,2vw,2rem)] w-full"
          style={carouselStyle}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-white/60 mb-3">
            Made with:
          </p>

          <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={40}
            gap={50}
            hoverSpeed={0}
            scaleOnHover
          />
        </div>
      </div>
    </section>
  );
}
