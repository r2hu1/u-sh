"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";
import click_event from "@/models/click_event";

/**
 * Get comprehensive analytics for a specific link
 * Returns summary statistics including total clicks, unique visitors, and basic breakdowns
 */
export const getLinkAnalytics = async (alias) => {
    const user = await currentUser();
    if (!user) return null;
    
    await connectToDb();
    try {
        // Verify the link belongs to the current user
        const link = await short_url.findOne({ 
            alias: alias,
            author: user.emailAddresses[0].emailAddress 
        });
        
        if (!link) return null;
        
        // Get total clicks from click events
        const totalClicks = await click_event.countDocuments({ alias: alias });
        
        // Get unique visitors (count distinct IP hashes)
        const uniqueVisitors = await click_event.distinct("ip_hash", { alias: alias });
        
        // Get basic breakdowns
        const deviceBreakdown = await click_event.aggregate([
            { $match: { alias: alias } },
            { $group: { _id: "$device_type", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        const countryBreakdown = await click_event.aggregate([
            { $match: { alias: alias } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        return {
            alias: alias,
            destination_url: link.destination_url,
            totalClicks: totalClicks,
            uniqueVisitors: uniqueVisitors.length,
            clicksCounter: link.clicks, // Backward compatibility counter
            deviceBreakdown: deviceBreakdown,
            topCountries: countryBreakdown
        };
    } catch (err) {
        console.log("Error getting link analytics:", err);
        return null;
    }
};

