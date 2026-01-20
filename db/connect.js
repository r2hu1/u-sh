"use server";
import { connect } from "mongoose";

export const connectToDb = async () => {
    try{
        await connect(process.env.MONGODB_URI);
    }
    catch(err) {
        console.log(err);
    }
};