import { Schema } from "mongoose";

// Schema for storing detailed click analytics
// Each click event captures comprehensive data about the visitor
export const clickEventSchema = new Schema({
    // Reference to the short URL alias
    alias: { type: String, required: true, index: true },
    
    // Timestamp of the click (indexed for time-series queries)
    timestamp: { type: Date, default: Date.now, index: true },
    
    // IP address (stored for analytics and geolocation)
    ip: { type: String, default: "unknown" },
    
    // Hashed IP address for privacy (using SHA-256)
    // Used for unique visitor counting without exposing actual IPs
    ip_hash: { type: String, required: true },
    
    // Geographic data from IP geolocation
    country: { type: String, default: "Unknown" },
    city: { type: String, default: "Unknown" },
    
    // Device and browser information parsed from user-agent
    device_type: { type: String, enum: ["mobile", "desktop", "tablet", "unknown"], default: "unknown" },
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    
    // Referrer information (where the click came from)
    referrer: { type: String, default: "direct" },
    
    // Raw user-agent string for reference
    user_agent: { type: String, default: "" }
}, { timestamps: true });

