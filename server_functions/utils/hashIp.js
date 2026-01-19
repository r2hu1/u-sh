import crypto from "crypto";

/**
 * Hash IP address for privacy compliance
 * Uses SHA-256 to create a one-way hash of the IP address
 * This allows us to track unique visitors without storing actual IPs
 */
export const hashIp = (ip) => {
    if (!ip) return null;
    // Create SHA-256 hash of the IP address
    return crypto.createHash("sha256").update(ip).digest("hex");
};

