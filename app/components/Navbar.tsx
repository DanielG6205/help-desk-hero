// Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-teal-300 drop-shadow-[0_0_4px_#14b8a6]"
        >
          HelpDeskHero
        </Link>

        <div className="hidden md:flex gap-10 text-gray-200">
          {["Problems", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="mt-2 hover:text-teal-300 hover:drop-shadow-[0_0_8px_#14b8a6] transition-all"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-300 hover:shadow-[0_0_12px_#14b8a6] transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
