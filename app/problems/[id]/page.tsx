import { problems } from "../index";
import { notFound } from "next/navigation";

type PageParams = {
  id: string;
};

export default async function ProblemDetail({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id } = await params;

  const problem = problems.find((p) => p.id === Number(id));
  if (!problem) return notFound();

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          {problem.name}
        </h1>

        {/* Difficulty + Skills */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-300">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            Difficulty: {problem.difficulty}
          </span>
          <div className="flex flex-wrap gap-2">
            {problem.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Download RDP Button */}
        <a
          href={problem.rdpFile}
          download
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
        >
          Download RDP File
        </a>

        {/* Instructions */}
        <div className="mt-10 bg-white/5 border border-white/10 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>

          <ol className="list-decimal ml-6 space-y-3 text-gray-300">
            {problem.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <p className="mt-6 text-gray-400 text-sm">
            Use the RDP file above to access the virtual machine for this scenario.
          </p>
        </div>
      </div>
    </div>
  );
}
