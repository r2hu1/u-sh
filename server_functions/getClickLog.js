"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";
import click_event from "@/models/click_event";

/**
 * Get paginated list of individual click events
 * Returns detailed information about each click including timestamp, location, device, etc.
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Number of clicks per page (default: 20)
 */
export const getClickLog = async (alias = null, page = 1, limit = 20) => {
    const user = await currentUser();
    if (!user) return { clicks: [], total: 0, page: 1, totalPages: 0 };
    
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
                return { clicks: [], total: 0, page: 1, totalPages: 0 };
            }
        }
        
        // Calculate pagination
        const skip = (page - 1) * limit;
        
        // Get total count for pagination
        const total = await click_event.countDocuments(matchQuery);
        const totalPages = Math.ceil(total / limit);
        
        // Fetch click events ordered by timestamp (newest first)
        const clicks = await click_event
            .find(matchQuery)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .select("timestamp ip ip_hash country city device_type browser os referrer")
            .lean();
        
        // Format the clicks data
        const formattedClicks = clicks.map(click => ({
            id: click._id.toString(),
            timestamp: click.timestamp,
            ip: click.ip || "unknown",
            ip_hash: click.ip_hash || "",
            country: click.country || "Unknown",
            city: click.city || "Unknown",
            device: click.device_type || "unknown",
            browser: click.browser || "Unknown",
            os: click.os || "Unknown",
            referrer: click.referrer || "direct"
        }));
        
        return {
            clicks: formattedClicks,
            total: total,
            page: page,
            totalPages: totalPages
        };
    } catch (err) {
        console.log("Error getting click log:", err);
        return { clicks: [], total: 0, page: 1, totalPages: 0 };
    }
};

