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
            "url('https://images.unsplash.com/photo-1535223289827-42f1e9919769')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* Tech grid overlay */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg bg-blue-400 text-transparent bg-clip-text">
          HelpDeskHero
        </h1>

        <p className="mt-6 text-xl max-w-2xl text-gray-200 tracking-wide">
          Master real-world IT support through structured, interactive practice.
          Become the help desk engineer every team needs.
        </p>    
        <button className="mt-8 px-8 py-3 rounded-xl font-semibold text-black bg-teal-300 hover:bg-teal-400 hover:shadow-[0_0_15px_#14b8a6] transition-all duration-200">
          <Link href="/problems">Start Practicing</Link>
        </button>
      </div>
    </section>
  );
}
