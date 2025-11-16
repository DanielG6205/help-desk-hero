"use client";

import Link from "next/link";
import { articles } from "./data";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-blue-400 text-transparent bg-clip-text">
          Learn Help Desk Skills
        </h1>

        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
          Master IT troubleshooting with simple, effective guides written for
          real-world help desk environments.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/learn/${article.id}`}
            className="group bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md 
                       hover:border-teal-400/40 hover:shadow-[0_0_15px_#14b8a6] transition-all"
          >
            <div className="text-sm text-teal-300 font-semibold mb-1">
              {article.category}
            </div>

            <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-300 transition">
              {article.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {article.description}
            </p>

            <div className="text-sm text-gray-500">{article.readTime}</div>
          </Link>
        ))}
      </div>

    </div>
  );
}
