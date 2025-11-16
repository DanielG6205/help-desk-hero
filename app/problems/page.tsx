"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import ProblemCard from "./ProblemCard";
import { problems } from "./index";
import { useCompletion } from "../../lib/useCompletion";
import { useAuth } from "../components/fb/AuthContent";
import LoginRequired from "../components/fb/LoginRequired";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const difficulties = ["Easy", "Medium", "Hard"] as const;
const skillsList = [
  "Active Directory",
  "Networking",
  "Exchange",
  "Troubleshooting",
  "User Management",
  "OS",
  "Diagnostics",
  "Mobile Device Support",
  "System Cleanup",
] as const;

type StatusFilter = "all" | "done" | "not_done";

export default function ProblemsPage() {
  // ---------- ALL HOOKS ----------
  const { user, loading } = useAuth();
  const { isDone, doneIds } = useCompletion();

  const [premiumStatus, setPremiumStatus] = useState<
    "free" | "monthly" | "yearly"
  >("free");

  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusFilter>("all");

  // ---------- LOAD PREMIUM ----------
  useEffect(() => {
    async function load() {
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setPremiumStatus(data.premium || "free");
      }
    }

    load();
  }, [user]);

  // ---------- MEMOS ----------
  const counts = useMemo(() => {
    const completed = problems.filter((p) => isDone(p.id)).length;
    return {
      done: completed,
      not: problems.length - completed,
      all: problems.length,
    };
  }, [isDone]);

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const diffOk =
        selectedDifficulty.length === 0 ||
        selectedDifficulty.includes(p.difficulty);

      const skillsOk =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => p.skills.includes(skill));

      const statusOk =
        status === "all" ||
        (status === "done" && isDone(p.id)) ||
        (status === "not_done" && !isDone(p.id));

      return diffOk && skillsOk && statusOk;
    });
  }, [selectedDifficulty, selectedSkills, status, isDone]);

  // ---------- AUTH GUARD ----------
  if (loading) return null;
  if (!user) return <LoginRequired />;

  // ---------- FILTER HANDLER ----------
  const toggleFilter = (filter: string, setter: any, current: string[]) => {
    setter(
      current.includes(filter)
        ? current.filter((f) => f !== filter)
        : [...current, filter]
    );
  };

  // ---------- RENDER ----------
  return (
    <div className="flex min-h-screen pt-24 px-6 bg-black text-white">

      {/* -------- FILTER SIDEBAR -------- */}
      <aside className="w-72 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md h-fit sticky top-28">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Filters
        </h2>

        {/* Status */}
        <div className="mb-6">
          <h3 className="text-teal-300 font-medium mb-2">Status</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                className="accent-teal-400"
                checked={status === "all"}
                onChange={() => setStatus("all")}
              />
              All <span className="text-xs text-gray-400 ml-auto">{counts.all}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                className="accent-teal-400"
                checked={status === "done"}
                onChange={() => setStatus("done")}
              />
              Done <span className="text-xs text-gray-400 ml-auto">{counts.done}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                className="accent-teal-400"
                checked={status === "not_done"}
                onChange={() => setStatus("not_done")}
              />
              Not Done{" "}
              <span className="text-xs text-gray-400 ml-auto">{counts.not}</span>
            </label>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <h3 className="text-teal-300 font-medium mb-2">Difficulty</h3>
          {difficulties.map((d) => (
            <label key={d} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-teal-400"
                checked={selectedDifficulty.includes(d)}
                onChange={() =>
                  toggleFilter(d, setSelectedDifficulty, selectedDifficulty)
                }
              />
              {d}
            </label>
          ))}
        </div>

        {/* Skills */}
        <h3 className="text-teal-300 font-medium mb-2">Skills</h3>
        {skillsList.map((skill) => (
          <label key={skill} className="flex items-center gap-2 cursor-pointer mb-1">
            <input
              type="checkbox"
              className="accent-teal-400"
              checked={selectedSkills.includes(skill)}
              onChange={() =>
                toggleFilter(skill, setSelectedSkills, selectedSkills)
              }
            />
            {skill}
          </label>
        ))}
      </aside>

      {/* -------- MAIN LIST -------- */}
      <main className="flex-1 ml-10">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Problems
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => {
            const done = doneIds.has(problem.id);
            const isLocked = problem.premium && !done && premiumStatus === "free";

            return (
              <Link
                href={isLocked ? "/premium" : `/problems/${problem.id}`}
                key={problem.id}
              >
                <ProblemCard
                  problem={problem}
                  done={done}
                  premiumStatus={premiumStatus}
                />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
