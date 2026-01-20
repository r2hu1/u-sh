"use server";

import User from "@/db/models/user";
import { connectToDb } from "../db/connect";
import short_url from "@/db/models/short_url";

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
  } catch (err) {
    console.log(err);
  }
};
