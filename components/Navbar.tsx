"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [lbOpen, setLbOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFirstName = () => {
    if (user?.firstName) return user.firstName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
            src="/logo/help-logo.svg"
            alt="HelpDeskHero Logo"
            className="h-14 w-auto"
          />
        </Link>

        <div className="hidden md:flex gap-10 text-gray-200 items-center">
          {/* Leaderboards Dropdown (use React hover state for reliability) */}
          <div
            className="relative"
            onMouseEnter={() => setLbOpen(true)}
            onMouseLeave={() => setLbOpen(false)}
          >
            {/* Invisible larger hit area so users can more easily hover the menu */}
            <div className="relative inline-block">
              <span
                className="absolute -inset-3 pointer-events-auto bg-transparent"
                aria-hidden="true"
              ></span>
              <button className="relative z-10 hover:text-teal-300 hover:drop-shadow-[0_0_8px_#14b8a6] transition-all">
                Leaderboards
              </button>
            </div>

            {/* Dropdown (visibility controlled by `lbOpen`) */}
            <div
              className={
                `absolute left-0 mt-2 w-40 bg-white text-black rounded-xl shadow-xl border border-gray-200 transition-all duration-150 ` +
                (lbOpen
                  ? "opacity-100 pointer-events-auto z-50"
                  : "opacity-0 pointer-events-none")
              }
            >
              <Link
                href="/leaderboard"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-600 transform hover:translate-x-1 transition-all duration-150"
              >
                Leaderboard
              </Link>

              <Link
                href="/streakboard"
                className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-600 transform hover:translate-x-1 transition-all duration-150"
              >
                Streakboard
              </Link>
            </div>
          </div>

          {/* Other Links */}
          <Link href="/labs" className="hover:text-teal-300 transition-all">
            Labs
          </Link>
          <Link href="/about" className="hover:text-teal-300 transition-all">
            About
          </Link>
          <Link href="/learn" className="hover:text-teal-300 transition-all">
            Learn
          </Link>

          {/* Auth */}
          {!user ? (
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-teal-400 text-black font-semibold rounded-lg hover:bg-teal-300 transition-all"
            >
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
                  <Link
                    href="/account"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-600 transform hover:translate-x-1 transition-all duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-600 transform hover:translate-x-1 transition-all duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/premium"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-600 transform hover:translate-x-1 transition-all duration-150"
                    onClick={() => setOpen(false)}
                  >
                    Upgrade
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 hover:text-red-700 transform hover:translate-x-1 transition-all duration-150"
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
