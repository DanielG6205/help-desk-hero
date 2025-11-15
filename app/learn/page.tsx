"use client";

import Link from "next/link";

type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "Troubleshooting Network Issues",
    description:
      "Learn how to diagnose and fix common network problems like connectivity loss, slow speeds, and DNS errors.",
    category: "Networking",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Resetting and Managing Active Directory Accounts",
    description:
      "A step-by-step guide to resetting user passwords, unlocking accounts, and handling permission issues.",
    category: "Active Directory",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Email Configuration and Syncing Issues",
    description:
      "Understand the root causes of Outlook and mobile email sync problems, and how to resolve them efficiently.",
    category: "Email Support",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Disk Space and Performance Optimization",
    description:
      "Learn techniques for freeing up disk space, identifying resource hogs, and improving system performance.",
    category: "System Maintenance",
    readTime: "8 min read",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold bg-blue-400 text-transparent bg-clip-text">
          Learn Help Desk Skills
        </h1>
        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
          Master IT support through bite-sized guides written by experienced
          professionals. Each article helps you handle real-world scenarios
          confidently.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/learn/${article.id}`}
            className="group bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-teal-400/40 hover:shadow-[0_0_15px_#14b8a6] transition-all"
          >
            <div className="mb-2 text-sm text-teal-300 font-semibold">
              {article.category}
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-300 transition">
              {article.title}
            </h3>
            <p className="text-gray-400 mb-4">{article.description}</p>
            <div className="text-sm text-gray-500">{article.readTime}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
