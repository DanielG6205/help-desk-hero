import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  returns: v.id("users"),

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const displayNameSource = (identity.name ?? "") || (identity.email ?? "");
    const displayName =
      displayNameSource && displayNameSource.trim().length > 0
        ? displayNameSource.trim()
        : `User ${identity.tokenIdentifier.split("|").pop()?.slice(-6) ?? "Anon"}`;

    // Check if we've already stored this identity before.
    // Note: If you don't want to define an index right away, you can use
    // ctx.db.query("users")
    //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    //  .unique();
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the display name has changed, patch the value.

      if (user.name !== displayName) {
        await ctx.db.patch(user._id, { name: displayName });
      }

      return user._id;
    }
    // If it's a new identity, create a new `User`.

    return await ctx.db.insert("users", {
      name: displayName,

      tokenIdentifier: identity.tokenIdentifier,

      problemsCompleted: [],
    });
  },
});

export const completeProblem = mutation({
  args: { problemId: v.id("problems") },
  returns: v.null(),
  handler: async (ctx, { problemId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called completeProblem without authentication present");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new Error("User record not found for current identity");
    }

    const completed = user.problemsCompleted ?? [];
    const alreadyDone = completed.some((id) => id === problemId);
    if (!alreadyDone) {
      await ctx.db.patch(user._id, {
        problemsCompleted: [...completed, problemId],
      });
    }

    return null;
  },
});

export const getMyProgress = query({
  args: {},
  returns: v.array(v.id("problems")),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      return [];
    }

    return user.problemsCompleted ?? [];
  },
});

export const submitCompletionKey = mutation({
  args: { problemId: v.id("problems"), key: v.string() },
  returns: v.object({
    result: v.union(
      v.object({
        kind: v.literal("success"),
        alreadyCompleted: v.boolean(),
      }),
      v.object({ kind: v.literal("invalid_key") }),
      v.object({ kind: v.literal("unauthenticated") }),
    ),
  }),
  handler: async (
    ctx,
    { problemId, key },
  ): Promise<{
    result:
      | { kind: "success"; alreadyCompleted: boolean }
      | { kind: "invalid_key" }
      | { kind: "unauthenticated" };
  }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { result: { kind: "unauthenticated" as const } };
    }

    const problem = await ctx.db.get(problemId);
    if (!problem) {
      throw new Error("Problem not found");
    }

    if (key !== problem.completionKey) {
      return { result: { kind: "invalid_key" as const } };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new Error("User record not found for current identity");
    }

    const completed = user.problemsCompleted ?? [];
    const already = completed.some((id) => id === problemId);
    if (!already) {
      await ctx.db.patch(user._id, {
        problemsCompleted: [...completed, problemId],
      });
    }

    return { result: { kind: "success", alreadyCompleted: already } };
  },
});

export const listLeaderboard = query({
  args: {},
  returns: v.array(
    v.object({
      userId: v.id("users"),
      name: v.string(),
      completedCount: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    users.sort((a, b) => {
      const ac = (a.problemsCompleted ?? []).length;
      const bc = (b.problemsCompleted ?? []).length;
      if (bc !== ac) return bc - ac;
      return a.name.localeCompare(b.name);
    });
    return users.map((u) => ({
      userId: u._id,
      name: u.name,
      completedCount: (u.problemsCompleted ?? []).length,
    }));
  },
});
