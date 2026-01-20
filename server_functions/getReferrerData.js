"use server";

import { connectToDb } from "../db/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/db/models/short_url";
import click_event from "@/db/models/click_event";

/**
 * Get referrer sources breakdown
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {number} limit - Maximum number of referrers to return (default: 15)
 */
export const getReferrerData = async (alias = null, limit = 15) => {
  const user = await currentUser();
  if (!user) return [];

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
        return [];
      }
    }

    // Aggregate clicks by referrer
    const referrerData = await click_event.aggregate([
      { $match: matchQuery },
      { $group: { _id: "$referrer", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    // Format for chart/list consumption
    const formattedData = referrerData.map((item) => ({
      referrer: item._id || "direct",
      clicks: item.count,
    }));

    return formattedData;
  } catch (err) {
    console.log("Error getting referrer data:", err);
    return [];
  }
};
