"use server";

import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";
import short_url from "@/models/short_url";

export const getUserClicks = async () => {
    const user = await currentUser();
    await connectToDb();
    try {
        const getLinks = await short_url.find({ author: user.emailAddresses[0].emailAddress });
        let allClicks = 0;
        for (let i = 0; i < getLinks.length; i++) {
            allClicks += getLinks[i].clicks;
        }
        return [allClicks];
    }
    catch (err) {
        console.log(err);
    }
};