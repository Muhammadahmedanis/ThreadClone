import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
import mongoose from "mongoose";
const { GET_SUCCESS_MESSAGES, UNAUTHORIZED_REQUEST, EMPTY_URL_PARAMS, NO_PERMISSION , UPDATE_SUCCESS_MESSAGES, NO_USER, NOT_ALLOWED} = responseMessages



// @desc   FOLLLOW-UNFOLLOW-USER
// @route   POST api/v1/user/follow/:id
// @access  Private

export const followUnfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!id || !userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };
    if (id === userId.toString()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NOT_ALLOWED);
    };

    // 🟢 Start a new MongoDB session
    const session = await mongoose.startSession();
    session.startTransaction();

    const userToModify = await User.findById(id).session(session);
    const currentUser = await User.findById(userId).session(session);
    if (!userToModify || !currentUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
        // 🟢 Unfollow user
        await User.findByIdAndUpdate(userId, { $pull: { following: id } }, { session });
        await User.findByIdAndUpdate(id, { $pull: { followers: userId } }, { session });
    } else {
        // 🟢 Follow user
        await User.findByIdAndUpdate(userId, { $addToSet: { following: id } }, { session });
        await User.findByIdAndUpdate(id, { $addToSet: { followers: userId } }, { session });
    }

    // 🟢 Commit the transaction (apply changes)
    await session.commitTransaction();
    session.endSession();

    res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, isFollowing ? "User unfollowed successfully" : "User followed successfully"));
});




// @desc    UPDATE-PROFILE
// @route   PUT api/v1/user/updateProfile/:id
// @access  Private

export const updateProfile = asyncHandler(async (req, res) => {
    const { userName, email, password, profilePic, bio } = req.body;

    const userId = req.user?._id;
    const { id } = req.params;
    if (!userId && !id) {
        throw new ApiError(StatusCodes.BAD_REQUEST,EMPTY_URL_PARAMS);
    };
    if (id !== userId.toString()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NO_PERMISSION);
    };


    let user = await User.findById(userId).select("+password");
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }

    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePic) user.profilePic = profilePic;
    if (password) {
        user.password = password;
    }

    await user.save();

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, UPDATE_SUCCESS_MESSAGES, user));
});




// @desc    PROFILE
// @route   GET api/v1/user/profile/:id
// @access  Prublic

export const getUserProile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST,EMPTY_URL_PARAMS);
    };
    const user = await User.findOne({_id:id} ).lean().select("-password -refreshToken -isVerified -updatedAt");
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    };
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, user));
})