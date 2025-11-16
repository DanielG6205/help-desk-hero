"use client";

import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Info() {
  return (
    <section className="relative w-full bg-black text-white h-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-10 py-24 lg:flex-row lg:items-stretch lg:gap-20 lg:px-24 lg:py-32">
        <div className="flex w-full flex-col gap-10 lg:w-1/2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300/70">
              Hands-on IT mastery
            </p>
            <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl h-30">
              <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
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
                  "Support!",
                  2000,
                  "Help Desk!",
                  4000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-teal-300"
              />
            </h2>
            <p className="text-lg leading-relaxed text-white/70">
              Help Desk Hero immerses you in authentic service scenarios so you
              can build repeatable troubleshooting instincts, communicate with
              confidence, and stay calm under pressure when systems fail.
              Everything in this track is tuned for aspiring IT pros and career
              switchers alike.
            </p>
          </div>
          <p className="text-base leading-relaxed text-white/70">
            Work through guided incidents, reinforce fundamentals with targeted
            explainers, and translate every fix into customer-ready
            communication so you grow confident across the entire support
            lifecycle.
          </p>
        </div>
        <div className="flex w-full flex-col lg:w-1/2">
          <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl transition-transform duration-500 lg:h-full">
            {/* Replace the src below with the final animated WEBP asset when available */}
            <Image
              src="/computer.webp"
              fill
              className="h-full w-full object-cover"
              alt="Animated preview of Help Desk Hero in action"
            />
            {/*<img
              src="/computer.webp"
              alt="Animated preview of Help Desk Hero in action"
              className="h-full w-full object-cover"
            />*/}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/40" />
          </div>
          <span className="mt-4 text-xs uppercase tracking-[0.28em] text-white/50 lg:text-right">
            Animated walkthrough preview
          </span>
        </div>
      </div>
    </section>
  );
}
