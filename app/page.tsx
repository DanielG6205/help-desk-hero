import Image from "next/image";
import Hero from "./components/Hero";
import Info from "./components/Info";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black font-sans">
      <Hero />
      <div className="w-full">
        <Info />
      </div>
    </div>  
  );
}
