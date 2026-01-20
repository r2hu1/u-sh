"use server";

import { connectToDb } from "../db/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/db/models/short_url";
import click_event from "@/db/models/click_event";

/**
 * Get geographic breakdown of clicks
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {number} limit - Maximum number of countries to return (default: 20)
 */
export const getGeographicData = async (alias = null, limit = 20) => {
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

    // Aggregate clicks by country
    const countryData = await click_event.aggregate([
      { $match: matchQuery },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);

    // Format for chart consumption
    const formattedData = countryData.map((item) => ({
      country: item._id || "Unknown",
      clicks: item.count,
    }));

    // Also get city-level data for top countries
    const cityData = await click_event.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: { country: "$country", city: "$city" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    const formattedCityData = cityData.map((item) => ({
      country: item._id.country || "Unknown",
      city: item._id.city || "Unknown",
      clicks: item.count,
    }));

    return {
      countries: formattedData,
      cities: formattedCityData,
    };
  } catch (err) {
    console.log("Error getting geographic data:", err);
    return { countries: [], cities: [] };
  }
};
