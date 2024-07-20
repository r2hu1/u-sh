"use server";
import { connect } from "mongoose";

export const connectToDb = async () => {
    try{
        await connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch(err) {
        console.log(err);
    }
};