"use server";

import { connectToDb } from "../db/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/db/models/short_url";
import click_event from "@/db/models/click_event";

/**
 * Get time-series data for clicks over time
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {string} period - Time period: 'day', 'week', or 'month'
 * @param {number} days - Number of days to look back (default: 30)
 */
export const getTimeSeriesData = async (
  alias = null,
  period = "day",
  days = 30,
) => {
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

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    matchQuery.timestamp = { $gte: startDate, $lte: endDate };

    // Group by time period
    let groupFormat;
    if (period === "day") {
      groupFormat = {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
        day: { $dayOfMonth: "$timestamp" },
      };
    } else if (period === "week") {
      groupFormat = {
        year: { $year: "$timestamp" },
        week: { $week: "$timestamp" },
      };
    } else {
      // month
      groupFormat = {
        year: { $year: "$timestamp" },
        month: { $month: "$timestamp" },
      };
    }

    const timeSeriesData = await click_event.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.week": 1 } },
    ]);

    // Format data for chart consumption
    const formattedData = timeSeriesData.map((item) => {
      let dateLabel;
      if (period === "day") {
        dateLabel = `${item._id.year}-${String(item._id.month).padStart(2, "0")}-${String(item._id.day).padStart(2, "0")}`;
      } else if (period === "week") {
        dateLabel = `Week ${item._id.week}, ${item._id.year}`;
      } else {
        dateLabel = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
      }

      return {
        date: dateLabel,
        clicks: item.count,
      };
    });

    return formattedData;
  } catch (err) {
    console.log("Error getting time series data:", err);
    return [];
  }
};
