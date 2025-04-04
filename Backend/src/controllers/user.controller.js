import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const { GET_SUCCESS_MESSAGES, UNAUTHORIZED_REQUEST, EMPTY_URL_PARAMS, NO_PERMISSION , UPDATE_SUCCESS_MESSAGES, IMAGE_FAIL, NO_USER, NOT_ALLOWED} = responseMessages
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose";

// @desc   FOLLLOW-UNFOLLOW-USER
// @route   POST api/v1/user/follow/:id
// @access  Private
export const followUnfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!id || !userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    }
    if (id === userId.toString()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NOT_ALLOWED);
    }

    const isUserExist = await User.findById(id);
    if (!isUserExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }

    const isFollowing = isUserExist.followers.includes(userId);
    await User.findByIdAndUpdate(
        id,
        { [isFollowing ? "$pull" : "$addToSet"]: { followers: userId } },
        { new: true }
    );

    res.status(StatusCodes.OK).send(
        new ApiResponse(
            StatusCodes.OK,
            isFollowing ? "User unfollowed successfully" : "User followed successfully"
        )
    );
});




// @desc    UPDATE-PROFILE
// @route   PUT api/v1/user/updateProfile/:id
// @access  Private

export const updateProfile = asyncHandler(async (req, res) => {
    const { userName, email, bio } = req.body;
    const user = req.user;
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }

    let profilePic = user.profilePic;
    if (req.file) {
        if (profilePic) {
            await cloudinary.uploader.destroy(profilePic.split("/").pop().split(".")[0]);
        }

        const uploadedImage = await uploadOnCloudinary(req.file.path);
        if (!uploadedImage) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, IMAGE_FAIL);
        }
        profilePic = uploadedImage.secure_url;
    }

    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePic = profilePic;

    await user.save(); 
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, UPDATE_SUCCESS_MESSAGES));
});


// @desc    PROFILE
// @route   GET api/v1/user/profile/:id
// @access  Prublic

export const getUserProile = asyncHandler(async (req, res) => {
    // const user1 = await User.findById(req?.user._id);  // route name  myInfo
    const { userName } = req.params;
    if (!userName) {
        throw new ApiError(StatusCodes.BAD_REQUEST,EMPTY_URL_PARAMS);
    };
    const user = await User.findOne({userName} ).lean().select("-password -refreshToken -isVerified -updatedAt");
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, user));
})


export const myDetail = asyncHandler(async (req, res) => {
    // const { id } = req.params;
    const id = req.user._id;
    if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST,EMPTY_URL_PARAMS);
    };
    const user = await User.findById(id)
    .select("-password -updatedAt -role -isVerified -__v")
    .populate({
        path: "followers",
        select: "_id",
        options: { lean: true } 
    })
    .populate("replies")
    .populate({path: "threads", populate: [{ path: "likes"}, { path: "comments"}, { path: "postedBy" }]})
    .populate({path: "replies",  populate: [
        { path: "commentBy", select: "userName profilePic" }, // Person who made the comment
        { 
            path: "post", 
            select: "postedBy",
            populate: { path: "postedBy", select: "userName profilePic" } // Owner of the post
        }
    ]})
    .populate({path: "reposts", populate: [{ path: "likes"}, { path: "comments"}, { path: "postedBy" }]})
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, user));
})




// @desc    SEARCH
// @route   GET api/v1/user/search/:query
// @access  Prublic

export const SearchUser = asyncHandler(async (req, res) => {
    const { query } = req.params;
    if (!query) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Search query is required");
    };
    
    const users = await User.find({
        $or: [
            {userName: { $regex: query, $options: 'i' }},
            {email: { $regex: query, $options: 'i' }},
        ]
    });
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, '', users));
})