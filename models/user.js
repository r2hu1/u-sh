import { userSchema } from "@/schema/User";
import { models, model } from "mongoose";

const User = models.User || model("User", userSchema);
export default User; 