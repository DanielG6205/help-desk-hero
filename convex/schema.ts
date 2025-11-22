// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  problems: defineTable({
    name: v.string(),
    difficulty: v.union(
      v.literal("Easy"),
      v.literal("Medium"),
      v.literal("Hard"),
    ),
    premium: v.boolean(),
    skills: v.array(v.string()),
    serverRdpFile: v.string(),
    workshopRdpFile: v.string(),
    completionKey: v.string(),
    image: v.string(),
    labScenario: v.array(v.string()),
    labTasks: v.array(v.string()),
    expectedOutcome: v.array(v.string()),
    instructions: v.array(v.string()),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    problemsCompleted: v.array(v.id("problems")),
  }).index("by_token", ["tokenIdentifier"]),
});
