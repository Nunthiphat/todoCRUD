import mongoose, { Schema } from "mongoose";

const workSchema = new Schema(
    {
        title: String,
        description: String,
        status: Boolean,
        duedate: String
    }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

export default Work;