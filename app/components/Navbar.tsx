// Navbar.tsx
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

  // Helper to safely extract first name
  const getFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(" ")[0];
    }
    if (user?.email) {
      return user.email.split("@")[0]; // fallback to email username
    }
    return "User";
  };

  // Close dropdown when clicking outside
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
          <img
            src="/logo.png"
            alt="HelpDeskHero Logo"
            className="h-14 w-auto"
          />
        </Link>


        {/* Desktop Links + Auth */}
        <div className="hidden md:flex gap-10 text-gray-200 items-center">

          {/* Page Links */}
          {["Leaderboard", "Problems", "About", "Learn"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-teal-300 hover:drop-shadow-[0_0_8px_#14b8a6] transition-all"
            >
              {item}
            </Link>
          ))}

          {/* Auth */}
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-teal-400 text-black font-semibold 
                         hover:bg-teal-300 hover:shadow-[0_0_12px_#14b8a6] transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 rounded-lg bg-teal-400 text-black font-semibold 
                           hover:bg-teal-300 hover:shadow-[0_0_12px_#14b8a6] transition-all"
              >
                Hi, {getFirstName()}
              </button>

              {/* Dropdown */}
              {open && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white text-black rounded-xl shadow-xl 
                             border border-gray-200 overflow-hidden animate-fadeIn"
                >
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>

                  <Link
                    href="/premium"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    Upgrade
                  </Link>

                  <button
                    onClick={() => {
                      signOut(auth);
                      setOpen(false);
                    }}
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
