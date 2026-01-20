import { Schema } from "mongoose";

export const userSchema = new Schema({
    email: { type: String, required: true },
    url_limit: { type: Number, default: 200 },
}, { timestamps: true });