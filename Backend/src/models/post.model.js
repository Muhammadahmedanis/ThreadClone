import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        maxLength: 500,
    },
    img: {
        type: String,
    },
    likes: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    // replies: [
    //     {
    //         userId: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User",
    //             required: true,
    //         },
    //         text: {
    //             type: String,
    //             required: true,
    //         },
    //         userProfilePic: {
    //             type: String,
    //         },
    //         userName:{
    //             type: String,
    //         }
    //     }
    // ]

}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema);