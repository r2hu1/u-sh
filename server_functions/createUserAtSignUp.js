"use server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDb } from "./mongodb/connect";
import User from "@/models/user";

export default async function createUserAtSignUp() {
    const user = await currentUser();
    if (!user) return;
    await connectToDb();
    try {
        const findUser = await User.findOne({ email: user.emailAddresses[0].emailAddress });
        if (findUser) return;
        
        const newUser = new User({ email: user.emailAddresses[0].emailAddress });
        await newUser.save();
        return true;
    }
    catch (e) {
        return false;
    }
};