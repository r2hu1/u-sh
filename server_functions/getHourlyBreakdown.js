"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";
import click_event from "@/models/click_event";

/**
 * Get hourly breakdown of clicks
 * Groups clicks by hour of day (0-23) to show peak hours
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {number} days - Number of days to look back (default: 30)
 */
export const getHourlyBreakdown = async (alias = null, days = 30) => {
    const user = await currentUser();
    if (!user) return [];
    
    await connectToDb();
    try {
        // Build match query - filter by user's links
        const userLinks = await short_url.find({ 
            author: user.emailAddresses[0].emailAddress 
        });
        const userAliases = userLinks.map(link => link.alias);
        
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
        
        // Group clicks by hour of day (0-23)
        const hourlyData = await click_event.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: { $hour: "$timestamp" },
                    clicks: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by hour (0-23)
        ]);
        
        // Create array with all 24 hours, filling in missing hours with 0 clicks
        const hourlyArray = Array.from({ length: 24 }, (_, i) => {
            const hourData = hourlyData.find(item => item._id === i);
            return {
                hour: i,
                clicks: hourData ? hourData.clicks : 0
            };
        });
        
        return hourlyArray;
    } catch (err) {
        console.log("Error getting hourly breakdown:", err);
        return [];
    }
};

