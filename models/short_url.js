import { shortUrlSchema } from "@/schema/Short_Url";
import { models, model } from "mongoose";

const short_url = models.Short_Url || model("Short_Url", shortUrlSchema);
export default short_url; 