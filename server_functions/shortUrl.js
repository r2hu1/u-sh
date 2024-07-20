"use server";
import { currentUser } from "@clerk/nextjs/server";
import { connectToDb } from "./mongodb/connect";
import short_url from "@/models/short_url";
import User from "@/models/user";

function randomAlias() {
    const characters = 'ae65r7t8yn9mu93145t32eyhrjkgmhn09i2gwhedcfvgbxc4v5b6n7ymuk089765rtdgvhbnm9iuhgvc';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default async function ShortUrl({ url, ali }) {
    const user = await currentUser();
    if (!user) return;
    await connectToDb();
    try {
        const getUserLimit = await User.findOne({ email: user.emailAddresses[0].emailAddress });
        if (getUserLimit.url_limit === 0) return JSON.stringify({ message: "You have reached your limit. Please try again next month." });
        if (!ali) {
            let random_alias = randomAlias();
            const searchAli = await short_url.findOne({ alias: random_alias });
            if (searchAli) {
                random_alias = randomAlias();
                const data = new short_url({ author: user.emailAddresses[0].emailAddress, destination_url: url, alias: random_alias });
                await data.save();
                const setUserLimit = await User.findOneAndUpdate({ email: user.emailAddresses[0].emailAddress }, { url_limit: getUserLimit.url_limit - 1 });
                await setUserLimit.save();
                return JSON.stringify(data);
            };
            const data = new short_url({ author: user.emailAddresses[0].emailAddress, destination_url: url, alias: random_alias });
            await data.save();
            const setUserLimit = await User.findOneAndUpdate({ email: user.emailAddresses[0].emailAddress }, { url_limit: getUserLimit.url_limit - 1 });
            await setUserLimit.save();
            return JSON.stringify(data);
        }
        const searchAli = await short_url.findOne({ alias: ali });
        if (searchAli) return JSON.stringify({ message: "Alias already exists" });
        const data = new short_url({ author: user.emailAddresses[0].emailAddress, destination_url: url, alias: ali });
        await data.save();
        const setUserLimit = await User.findOneAndUpdate({ email: user.emailAddresses[0].emailAddress }, { url_limit: getUserLimit.url_limit - 1 });
        await setUserLimit.save();
        return JSON.stringify(data);
    }
    catch (e) {
        console.log(e)
        return false;
    }
}