"use server";

import User from "@/models/user";
import { connectToDb } from "./mongodb/connect";
import short_url from "@/models/short_url";

export const getData = async () => {
    await connectToDb();
    try {
        const getUsers = await User.find({});
        const getLinks = await short_url.find({});
        let allClicks = 0;
        for (let i = 0; i < getLinks.length; i++) {
            allClicks += getLinks[i].clicks;
        }
        return [getUsers.length, getLinks.length, allClicks];
    }
    catch (err) {
        console.log(err);
    }
};