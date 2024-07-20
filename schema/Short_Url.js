import { Schema } from "mongoose";

export const shortUrlSchema = new Schema({
    author: { type: String, required: true },
    destination_url: { type: String, required: true },
    alias: { type: String, required: true, max: 30 },
}, { timestamps: true });