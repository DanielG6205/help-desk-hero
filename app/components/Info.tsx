"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <div className="w-full flex flex-col gap-24 px-10 py-24 bg-black text-white">
      {/* ---- Title ---- */}
      <div className="text-center text-5xl font-extrabold">
        <span className="bg-cyan-300 text-transparent bg-clip-text">
          Practice{" "}
        </span>
        <TypeAnimation
          sequence={[
            "Troubleshooting!",
            2000,
            "Ticket Triage!",
            2000,
            "System Debugging!",
            2000,
            "Customer Support!",
            2000,
            "Help Desk!",
            4000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-teal-300"
        />
      </div>

      {/* ---- Unified 2x2 Grid Box ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-lg hover:border-teal-400/40 transition-all duration-300">
        {/* Top Left — Practice Image */}
        <div className="flex items-center justify-center bg-white/10 p-6">
          <img
            src="/practice-placeholder.png"
            alt="Practice Help Desk Scenarios"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Top Right — Practice Text */}
        <div className="flex flex-col justify-center p-10 text-center lg:text-left">
          <h2 className="text-4xl font-bold bg-teal-300 text-transparent bg-clip-text mb-4">
            Practice
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Solve realistic help desk problems that sharpen your ability to
            troubleshoot, diagnose issues, and communicate solutions clearly.
            Build confidence through hands-on scenarios.
          </p>
        </div>

        {/* Bottom Left — Learn Text */}
        <div className="flex flex-col justify-center p-10 text-center lg:text-left">
          <h2 className="text-4xl font-bold bg-teal-300 text-transparent bg-clip-text mb-4">
            Learn
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Deepen your understanding with structured articles that teach IT
            fundamentals, service workflows, and industry best practices for
            effective support.
          </p>
        </div>

        {/* Bottom Right — Learn Image */}
        <div className="flex items-center justify-center bg-white/10 p-6">
          <img
            src="/learn-placeholder.png"
            alt="Learn Help Desk Skills"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
