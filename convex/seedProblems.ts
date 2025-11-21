import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Import your static array if you like:
import { problems } from "../app/labs/index"; // adjust path

export const seedProblems = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existing = await ctx.db.query("problems").collect();
    if (existing.length > 0) return "Already seeded";

    for (const p of problems) {
      await ctx.db.insert("problems", p);
    }
    return "Seed complete";
  },
});
