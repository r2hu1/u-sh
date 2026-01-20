"use server";

import { connectToDb } from "../db/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/db/models/short_url";
import click_event from "@/db/models/click_event";

/**
 * Get unique visitor count by IP hash
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 */
export const getUniqueVisitors = async (alias = null) => {
  const user = await currentUser();
  if (!user) return { unique: 0, total: 0 };

  await connectToDb();
  try {
    // Build match query - filter by user's links
    const userLinks = await short_url.find({
      author: user.emailAddresses[0].emailAddress,
    });
    const userAliases = userLinks.map((link) => link.alias);

    const matchQuery = { alias: { $in: userAliases } };
    if (alias) {
      // Verify alias belongs to user
      if (userAliases.includes(alias)) {
        matchQuery.alias = alias;
      } else {
        return { unique: 0, total: 0 };
      }
    }

    // Get total clicks
    const totalClicks = await click_event.countDocuments(matchQuery);

    // Get unique visitors (distinct IP hashes)
    const uniqueVisitors = await click_event.distinct("ip_hash", matchQuery);

    return {
      unique: uniqueVisitors.length,
      total: totalClicks,
    };
  } catch (err) {
    console.log("Error getting unique visitors:", err);
    return { unique: 0, total: 0 };
  }
};
