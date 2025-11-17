import Image from "next/image";
import Hero from "../components/sections/Hero";
import Info from "../components/sections/Info";
import LogoCarousel from "../components/LogoLoop/LogoCarousel";
import {
  Firebase,
  Zed,
  Vercel,
  ReactLogo,
  MicrosoftAzure,
} from "../components/LogoLoop/LogoIcons";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black font-sans">
      <Hero />
      <div className="w-full h-full bg-black">
        <Info />
      </div>
    </div>
  );
}
