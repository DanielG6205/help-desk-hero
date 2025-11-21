import { query } from "./_generated/server";

import type { Doc } from "./_generated/dataModel";

import { v } from "convex/values";

/**

 * List all problems from the Convex database.

 *

 * Usage (client):

 *   const problems = useQuery(api.problems.list);

 */

export const list = query({
  args: {},

  handler: async (ctx): Promise<Doc<"problems">[]> => {
    const rows = await ctx.db.query("problems").collect();

    // Stable ordering by creation time (ascending) to support numeric indexing
    rows.sort((a, b) => a._creationTime - b._creationTime);

    return rows;
  },
});

/**
 * Get a single problem by its 1-based number in the same stable ordering as `list`.

 *

 * This mirrors the old `/labs/[id]` pages which addressed labs by number.

 */

export const getByNumber = query({
  args: { number: v.number() },

  handler: async (ctx, { number }): Promise<Doc<"problems"> | null> => {
    const rows = await ctx.db.query("problems").collect();

    // Use the same stable ordering as `list` (creation time asc)

    rows.sort((a, b) => a._creationTime - b._creationTime);

    const index = Math.max(1, Math.floor(number)) - 1;

    return rows[index] ?? null;
  },
});
