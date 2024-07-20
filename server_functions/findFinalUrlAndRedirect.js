"use server";

import short_url from "@/models/short_url";
import { connectToDb } from "./mongodb/connect";

export const findFinalUrlAndRedirect = async (id) => { 
    try{
        await connectToDb();
        const data = await short_url.findOne({ alias: id });
        const updateClick = await short_url.findOneAndUpdate({ alias: id }, { clicks: data.clicks + 1 });
        await updateClick.save();
        return JSON.stringify(data.destination_url);
    }
    catch(err){
        return false;
    }
};