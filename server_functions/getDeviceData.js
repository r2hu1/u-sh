"use server";

import { connectToDb } from "../db/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/db/models/short_url";
import click_event from "@/db/models/click_event";

/**
 * Get device, browser, and OS breakdown
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 */
export const getDeviceData = async (alias = null) => {
  const user = await currentUser();
  if (!user) return { devices: [], browsers: [], os: [] };

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
        return { devices: [], browsers: [], os: [] };
      }
    }

    // Get device type breakdown
    const deviceData = await click_event.aggregate([
      { $match: matchQuery },
      { $group: { _id: "$device_type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Get browser breakdown
    const browserData = await click_event.aggregate([
      { $match: matchQuery },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Get OS breakdown
    const osData = await click_event.aggregate([
      { $match: matchQuery },
      { $group: { _id: "$os", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Format for chart consumption
    const formattedDevices = deviceData.map((item) => ({
      device: item._id || "unknown",
      clicks: item.count,
    }));

    const formattedBrowsers = browserData.map((item) => ({
      browser: item._id || "Unknown",
      clicks: item.count,
    }));

    const formattedOS = osData.map((item) => ({
      os: item._id || "Unknown",
      clicks: item.count,
    }));

    return {
      devices: formattedDevices,
      browsers: formattedBrowsers,
      os: formattedOS,
    };
  } catch (err) {
    console.log("Error getting device data:", err);
    return { devices: [], browsers: [], os: [] };
  }
};
