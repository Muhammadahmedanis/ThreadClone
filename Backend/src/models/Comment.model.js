import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    text: {
        type: String,
    },


}, { timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);