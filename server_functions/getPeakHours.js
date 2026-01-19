"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";
import click_event from "@/models/click_event";

/**
 * Analyze peak hours and days of week
 * Identifies the busiest hours of the day and busiest days of the week
 * @param {string} alias - The link alias (optional, if not provided returns data for all user links)
 * @param {number} days - Number of days to look back (default: 30)
 */
export const getPeakHours = async (alias = null, days = 30) => {
    const user = await currentUser();
    if (!user) return { peakHours: [], peakDays: [], topHour: null, topDay: null };
    
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
                return { peakHours: [], peakDays: [], topHour: null, topDay: null };
            }
        }
        
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        matchQuery.timestamp = { $gte: startDate, $lte: endDate };
        
        // Get peak hours of day (0-23)
        const peakHoursData = await click_event.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: { $hour: "$timestamp" },
                    clicks: { $sum: 1 }
                }
            },
            { $sort: { clicks: -1 } },
            { $limit: 5 } // Top 5 peak hours
        ]);
        
        // Get peak days of week (0=Sunday, 1=Monday, ..., 6=Saturday)
        const peakDaysData = await click_event.aggregate([
            { $match: matchQuery },
            {
                $group: {
                    _id: { $dayOfWeek: "$timestamp" },
                    clicks: { $sum: 1 }
                }
            },
            { $sort: { clicks: -1 } },
            { $limit: 7 } // All 7 days
        ]);
        
        // Format peak hours
        const peakHours = peakHoursData.map(item => ({
            hour: item._id,
            clicks: item.clicks,
            // Format hour for display (e.g., "2pm", "10am")
            formattedHour: formatHour(item._id)
        }));
        
        // Format peak days
        // MongoDB $dayOfWeek returns 1 (Sunday) through 7 (Saturday)
        const dayNames = ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const peakDays = peakDaysData.map(item => ({
            day: item._id,
            dayName: dayNames[item._id] || "Unknown",
            clicks: item.clicks
        }));
        
        // Get top hour and top day
        const topHour = peakHours.length > 0 ? peakHours[0] : null;
        const topDay = peakDays.length > 0 ? peakDays[0] : null;
        
        return {
            peakHours: peakHours,
            peakDays: peakDays,
            topHour: topHour,
            topDay: topDay
        };
    } catch (err) {
        console.log("Error getting peak hours:", err);
        return { peakHours: [], peakDays: [], topHour: null, topDay: null };
    }
};

/**
 * Format hour (0-23) to readable format (e.g., "2pm", "10am")
 */
function formatHour(hour) {
    if (hour === 0) return "12am";
    if (hour < 12) return `${hour}am`;
    if (hour === 12) return "12pm";
    return `${hour - 12}pm`;
}

