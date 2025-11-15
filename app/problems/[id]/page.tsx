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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          {problem.name}
        </h1>
      </div>
    </div>
  );
}
