"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqs: FAQItem[] = [
    {
      question: "What is HelpDeskHero?",
      answer: (
        <>
          HelpDeskHero is a hands-on IT help desk training platform with labs,
          problems, streaks, leaderboards, and realistic troubleshooting
          scenarios. Our goal is to become the #1 platform for modern IT
          training.
        </>
      ),
    },
    {
      question: "How do labs work?",
      answer: (
        <>
          Each lab provides:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Server RDP download</li>
            <li>Workshop RDP download</li>
            <li>A completion key to submit</li>
          </ul>
          When the key is submitted, the completion is saved to your account.
        </>
      ),
    },
    {
      question: "Why can’t I access a problem or lab?",
      answer: (
        <>
          You must be logged in. Some content is also Premium-only. If you&apos;re
          logged out, a login screen will appear automatically.
        </>
      ),
    },
    {
      question: "How does streak tracking work?",
      answer: (
        <>
          Your streak increases each day you complete a problem or lab. If you
          miss a day, you may use a <b>Streak Freeze</b> if available.
        </>
      ),
    },
    {
      question: "What does Premium include?",
      answer: (
        <>
          Premium unlocks:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>All problems</li>
            <li>All labs</li>
            <li>All articles</li>
            <li>No ads</li>
            <li>Premium badge</li>
            <li>Higher streak rewards</li>
          </ul>
        </>
      ),
    },
    {
      question: "What are the pricing options?",
      answer: (
        <>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Premium Monthly — <b>$20/mo</b></li>
            <li>Premium Yearly — <b>$180/yr</b> (you save $60)</li>
            <li>Free Tier — limited access + free trial</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-center text-5xl font-extrabold mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_#0891b2]">
          Frequently Asked Questions
        </h1>

        {/* Description */}
        <p className="text-center text-gray-300 mb-14 max-w-2xl mx-auto">
          Find quick answers to common questions about labs, problems,
          streaks, premium access, Firebase issues, and how HelpDeskHero works.
        </p>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-md p-5 transition-all"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-6 w-6 text-cyan-300 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown content */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  openIndex === i ? "max-h-96 mt-3" : "max-h-0"
                }`}
              >
                <div className="text-gray-300 leading-relaxed text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}
