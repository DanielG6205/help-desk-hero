"use client";

import Link from "next/link";
import { useAuth } from "./fb/AuthContent";
import { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFirstName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 py-2 left-0 w-full z-30 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="block">
          <img src="/logo/help-logo.svg" alt="HelpDeskHero Logo" className="h-14 w-auto" />
        </Link>

        <div className="hidden md:flex gap-10 text-gray-200 items-center">

          {/* Leaderboards Dropdown with Hover Bridge */}
          <div className="relative group">
            <button className="hover:text-teal-300 hover:drop-shadow-[0_0_8px_#14b8a6] transition-all">
              Leaderboards
            </button>

            {/* Invisible hover area under the button */}
            <div className="absolute left-0 top-full w-full h-4 bg-transparent pointer-events-auto"></div>

            {/* Dropdown */}
            <div
              className="
                absolute left-0 mt-2 w-40 bg-white text-black rounded-xl shadow-xl 
                border border-gray-200
                opacity-0 pointer-events-none
                group-hover:opacity-100 group-hover:pointer-events-auto
                transition-all duration-150
              "
            >
              <Link href="/leaderboard" className="block px-4 py-2 hover:bg-gray-100 transition">
                Leaderboard
              </Link>

              <Link href="/streakboard" className="block px-4 py-2 hover:bg-gray-100 transition">
                Streakboard
              </Link>
            </div>
          </div>

          {/* Other Links */}
          <Link href="/labs" className="hover:text-teal-300 transition-all">Labs</Link>
          <Link href="/about" className="hover:text-teal-300 transition-all">About</Link>
          <Link href="/learn" className="hover:text-teal-300 transition-all">Learn</Link>

          {/* Auth */}
          {!user ? (
            <Link href="/login" className="px-4 py-2 bg-teal-400 text-black font-semibold rounded-lg hover:bg-teal-300 transition-all">
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-300 transition-all"
              >
                Hi, {getFirstName()}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-100 transition" onClick={() => setOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 transition" onClick={() => setOpen(false)}>
                    Settings
                  </Link>
                  <Link href="/premium" className="block px-4 py-2 hover:bg-gray-100 transition" onClick={() => setOpen(false)}>
                    Upgrade
                  </Link>
                  <button
                    onClick={() => { signOut(auth); setOpen(false); }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
