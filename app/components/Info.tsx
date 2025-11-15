"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Info() {
  return (
    <div className="w-full flex flex-col gap-24 px-10 py-24 bg-black text-white">

      {/* ---- Title: Practice [topics] ---- */}
      <div className="text-center text-5xl font-extrabold">
        <span className="bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
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
            2000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className="text-teal-300"
        />
      </div>

      {/* ---- Practice Section ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg">
        <img
          src="/practice-placeholder.png"
          alt="Practice Problem"
          className="w-full h-auto rounded-xl shadow-lg"
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
            Practice
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Solve realistic help desk scenarios built to help you master
            troubleshooting, user support, and diagnostic workflows.
          </p>
        </div>
      </div>

      {/* ---- Learn Section ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg">
        
        {/* Text LEFT for Learn */}
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text">
            Learn
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Explore well-structured articles that teach core concepts, workflows,
            system knowledge, and industry-standard help desk practices.
          </p>
        </div>

        {/* Image RIGHT */}
        <img
          src="/learn-placeholder.png"
          alt="Learning Article"
          className="w-full h-auto rounded-xl shadow-lg order-1 md:order-2"
        />
      </div>
    </div>
  );
}
