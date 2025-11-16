import { notFound } from "next/navigation";
import { articles } from "../data";

type PageParams = {
  id: string;
};
export default async function ArticlePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { id } = await params;
  const articleId = Number(id);

  const article = articles.find((a) => a.id === articleId);

  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-10 backdrop-blur-md">
        {/* CATEGORY + READ TIME */}
        <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
            {article.category}
          </span>
          <span className="text-gray-400">{article.readTime}</span>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-blue-400 text-transparent bg-clip-text">
          {article.title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-300 leading-relaxed text-lg mb-10">
          {article.description}
        </p>

        {/* BODY (placeholder) */}
        <div className="text-gray-400 space-y-4">
          <p>
            This article content is coming soon. You will find detailed
            guidance, step-by-step instructions, and real-world examples here.
          </p>

          <p>
            We are building high-quality help desk learning material to help you
            grow your technical skills.
          </p>

          <p>Stay tuned — new content is being added every week.</p>
        </div>
      </div>
    </div>
  );
}
