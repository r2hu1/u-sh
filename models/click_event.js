import { clickEventSchema } from "@/schema/Click_Event";
import { models, model } from "mongoose";

// Model for click events - stores detailed analytics for each click
const click_event = models.Click_Event || model("Click_Event", clickEventSchema);
export default click_event;

