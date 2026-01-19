import { NextResponse } from "next/server";
import short_url from "@/models/short_url";
import click_event from "@/models/click_event";
import { connectToDb } from "@/server_functions/mongodb/connect";
import { hashIp } from "@/server_functions/utils/hashIp";
import { UAParser } from "ua-parser-js";

/**
 * API route for handling URL redirects with analytics capture
 * This route captures detailed analytics about each click before redirecting
 */
export async function GET(request, { params }) {
    try {
        const { id } = params;
        
        // Connect to database
        await connectToDb();
        
        // Find the short URL
        const urlData = await short_url.findOne({ alias: id });
        if (!urlData) {
            return NextResponse.json({ error: "Link not found" }, { status: 404 });
        }
        
        // Extract request information for analytics
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
                   request.headers.get("x-real-ip") || 
                   "unknown";
        const userAgent = request.headers.get("user-agent") || "";
        const referrer = request.headers.get("referer") || "direct";
        
        // Hash IP for privacy
        const ipHash = hashIp(ip);
        
        // Parse user-agent to extract device, browser, and OS info
        const parser = new UAParser(userAgent);
        const deviceType = parser.getDevice().type || "desktop";
        const browser = parser.getBrowser().name || "Unknown";
        const os = parser.getOS().name || "Unknown";
        
        // Normalize device type
        let normalizedDeviceType = "unknown";
        if (deviceType === "mobile") normalizedDeviceType = "mobile";
        else if (deviceType === "tablet") normalizedDeviceType = "tablet";
        else if (deviceType === undefined || deviceType === null) normalizedDeviceType = "desktop";
        else normalizedDeviceType = deviceType;
        
        // Fetch geolocation data using ip-api.com (free tier, no API key required)
        let country = "Unknown";
        let city = "Unknown";
        
        try {
            // Only fetch geolocation if IP is valid (not "unknown")
            if (ip !== "unknown" && ip) {
                const geoResponse = await fetch(
                    `http://ip-api.com/json/${ip}?fields=status,country,city`,
                    { 
                        method: "GET",
                        headers: { "Accept": "application/json" }
                    }
                );
                
                if (geoResponse.ok) {
                    const geoData = await geoResponse.json();
                    if (geoData.status === "success") {
                        country = geoData.country || "Unknown";
                        city = geoData.city || "Unknown";
                    }
                }
            }
        } catch (geoError) {
            // If geolocation fails, continue with "Unknown" values
            // This ensures redirect still works even if geolocation service is down
            console.log("Geolocation lookup failed:", geoError.message);
        }
        
        // Normalize referrer
        let normalizedReferrer = "direct";
        if (referrer && referrer !== "direct") {
            try {
                const referrerUrl = new URL(referrer);
                const hostname = referrerUrl.hostname;
                
                // Categorize common referrers
                if (hostname.includes("google") || hostname.includes("bing") || hostname.includes("yahoo")) {
                    normalizedReferrer = "search";
                } else if (hostname.includes("facebook") || hostname.includes("twitter") || 
                          hostname.includes("instagram") || hostname.includes("linkedin") ||
                          hostname.includes("reddit") || hostname.includes("pinterest")) {
                    normalizedReferrer = "social";
                } else if (hostname.includes("mail") || hostname.includes("gmail") || hostname.includes("outlook")) {
                    normalizedReferrer = "email";
                } else {
                    normalizedReferrer = hostname;
                }
            } catch {
                normalizedReferrer = referrer;
            }
        }
        
        // Create click event document (async, don't wait for it to complete)
        // This allows the redirect to happen quickly while analytics are saved in background
        click_event.create({
            alias: id,
            timestamp: new Date(),
            ip: ip, // Store actual IP address
            ip_hash: ipHash, // Store hashed IP for privacy-compliant unique visitor tracking
            country: country,
            city: city,
            device_type: normalizedDeviceType,
            browser: browser,
            os: os,
            referrer: normalizedReferrer,
            user_agent: userAgent
        }).catch(err => {
            // Log error but don't block redirect
            console.log("Failed to save click event:", err.message);
        });
        
        // Increment clicks counter (for backward compatibility and quick totals)
        await short_url.findOneAndUpdate(
            { alias: id },
            { $inc: { clicks: 1 } }
        );
        
        // Redirect to destination URL
        return NextResponse.redirect(urlData.destination_url, { status: 302 });
        
    } catch (error) {
        console.error("Redirect error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

