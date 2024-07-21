"use server";
import short_url from "@/models/short_url";
import { connectToDb } from "./mongodb/connect";
import { currentUser } from "@clerk/nextjs/server";

export default async function editOneById({ id, url, ali }) {
    const user = await currentUser();
    await connectToDb();
    try {
        const data = await short_url.findByIdAndUpdate({ _id: id, author: user.emailAddresses[0].emailAddress }, { destination_url: url, alias: ali });
        return JSON.stringify(data);
    }
    catch (err) {
        return false;
    }
}