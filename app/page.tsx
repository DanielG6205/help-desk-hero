"use client";
import Hero from "../components/sections/Hero";
import Info from "../components/sections/Info";
import { useStoreUserEffect } from "./useStoreUserEffect";

export default function Home() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  return (
    <div className="w-full min-h-screen bg-black font-sans">
      <Hero />
      <div className="w-full h-full bg-black">
        <Info />
      </div>
    </div>
  );
}
