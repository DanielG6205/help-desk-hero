// Hero.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px),linear-gradient(to_right,#fff_2px,transparent_2px),linear-gradient(to_bottom,#fff_2px,transparent_2px)] bg-[size:40px_40px,40px_40px,160px_160px,160px_160px]" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center text-left px-34 text-white">
        <h1 className="text-7xl font-extrabold tracking-wide drop-shadow-lg text-white">
          Practice helpdesk work.
        </h1>
        <h1 className="text-7xl font-extrabold tracking-wide drop-shadow-lg text-white mt-2">
          Troubleshoot real computers.
        </h1>
        <h1 className="text-7xl font-extrabold tracking-wide drop-shadow-lg text-white mt-2">
          Be a Hero.
        </h1>

        {/* Sub-section similar to Intercom's Fin AI Agent + Helpdesk */}
        <div className="w-full mt-8 pt-6 border-t border-white/75">
          <div className="grid grid-cols-2 gap-8 items-start">
            <div className="text-left">
              <span className="block uppercase text-[13px] md:text-[14px] font-medium tracking-[0.1em] text-white/70">
                REAL SYSTEMS + REAL TROUBLESHOOTING.
              </span>
            </div>
            <div className="text-right">
              <p className="text-[17px] md:text-[18px] font-normal leading-relaxed text-[rgba(255,255,255,0.85)]">
                Help Desk Hero isn’t a simulation. It’s hands‑on training with
                real virtual machines where you diagnose, repair, and learn by
                doing.
              </p>
            </div>
          </div>
        </div>

        <button className="self-end mt-10 px-8 py-3 rounded-xl font-semibold text-black bg-teal-300 hover:bg-teal-400 hover:shadow-[0_0_15px_#14b8a6] transition-all duration-200">
          <Link href="/problems">Start Practicing</Link>
        </button>
      </div>
    </section>
  );
}
