"use client";

import { useState } from "react";
import Link from "next/link";
import ProblemCard from "./ProblemCard";
import { problems } from "./index";

const difficulties = ["Easy", "Medium", "Hard"];
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
];

export default function ProblemsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleFilter = (filter: string, setter: any, current: string[]) => {
    setter(
      current.includes(filter)
        ? current.filter((f) => f !== filter)
        : [...current, filter]
    );
  };

  const filteredProblems = problems.filter((p) => {
    const diffOk =
      selectedDifficulty.length === 0 ||
      selectedDifficulty.includes(p.difficulty);
    const skillsOk =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => p.skills.includes(skill));
    return diffOk && skillsOk;
  });

  return (
    <div className="flex min-h-screen pt-24 px-6 bg-black text-white">
      <aside className="w-64 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md h-fit sticky top-28">
        <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Filters
        </h2>

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

        <h3 className="text-teal-300 font-medium mb-2">Skills</h3>
        {skillsList.map((skill) => (
          <label key={skill} className="flex items-center gap-2 cursor-pointer">
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

      <main className="flex-1 ml-10">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          Problems
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <Link href={`/problems/${problem.id}`} key={problem.id}>
              <ProblemCard problem={problem} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
