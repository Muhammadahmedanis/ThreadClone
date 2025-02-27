import { Comment } from "../models/Comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const { MISSING_FIELDS, USER_EXISTS, CREATE_SUCCESS_MESSAGES, NO_USER,  UNAUTHORIZED_REQUEST, GET_SUCCESS_MESSAGES, RESET_LINK_SUCCESS,  NOT_VERIFY, EMPTY_URL_PARAMS, UPDATE_UNSUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, ADD_SUCCESS_MESSAGES, NO_DATA_FOUND, IMAGE_SUCCESS, IMAGE_ERROR, IMAGE_FAIL, UPDATE_SUCCESS_MESSAGES, UNAUTHORIZED} = responseMessages

// @desc    CREATEPOST
// @route   POST /api/v1/post/create
// @access  User

export const createComment = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED);
    };
    const { id } = req.params;
    if (!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };

    const { text } = req.body;
    if (!text.trim()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELDS);
    };

    const isPostExist = await Post.findById(id);
    if (!isPostExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    };

    const comment = await new Comment({ text, commentBy: userId, post: isPostExist._id }).save();
    await Post.findByIdAndUpdate(id, {$push: {comments: comment._id} }, {new: true});
    await User.findByIdAndUpdate(userId, {$push: {replies: comment._id} }, {new: true});
    return res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, CREATE_SUCCESS_MESSAGES, comment));
})



// @desc    DELETECOMMENT
// @route   DELETE /api/v1/post/create
// @access  User
export const deleteComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    if (!postId || !commentId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    }

    const post = await Post.findById(postId).lean();
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    }
    
    const comment = await Comment.findById(commentId).lean();
    if (!comment) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    }
    if (comment.commentBy.toString() !== req.user._id.toString()) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST);
    }

    await Post.findByIdAndUpdate(postId, {
        $pull: { comments: commentId },
    });

    await User.findByIdAndUpdate(req.user._id, {
        $pull: { replies: commentId },
    });

    await Comment.findByIdAndDelete(commentId);
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
});
