import { Post} from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Joi from "joi";
import { responseMessages } from "../constant/responseMessages.js";
import { User } from "../models/user.model.js";
const { MISSING_FIELDS, USER_EXISTS, CREATE_SUCCESS_MESSAGES, NO_USER,  UNAUTHORIZED_REQUEST, GET_SUCCESS_MESSAGES, RESET_LINK_SUCCESS,  NOT_VERIFY, EMPTY_URL_PARAMS, UPDATE_UNSUCCESS_MESSAGES, DELETED_SUCCESS_MESSAGES, ADD_SUCCESS_MESSAGES, NO_DATA_FOUND, IMAGE_SUCCESS, IMAGE_ERROR, IMAGE_FAIL, UPDATE_SUCCESS_MESSAGES, UNAUTHORIZED} = responseMessages


// Joi schema for input validation
const postSchema = Joi.object({
    // postedBy: Joi.string().required().trim(),
    text: Joi.string().max(500).required().trim(),
});


// @desc    CREATEPOST
// @route   POST /api/v1/post/create
// @access  User

export const createPost = asyncHandler(async (req, res) => {
    const postedBy = req.user?._id;  // Automatically take user ID from auth
    if (!postedBy) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED);
    };

    const { text } = req.body;
    // Validate request data using Joi
    const { error } = postSchema.validate({ text });
    if (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.details[0].message);
    }

    const user = await User.findById(postedBy).lean();
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    };
    if(user?._id.toString() !== postedBy?._id.toString()){
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED);
    };
    
    let imageUrl = null;
    if (req.file) {
        const uploadedImage = await uploadOnCloudinary(req.file.path);
        if (!uploadedImage) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Image upload failed.");
        }
        imageUrl = uploadedImage.secure_url;
    }
    
    const newPost = new Post({ postedBy, text, img: imageUrl});
    await newPost.save();
    return res.status(StatusCodes.CREATED).send(new ApiResponse(StatusCodes.CREATED, CREATE_SUCCESS_MESSAGES, newPost));
})



// @desc    GETPOST
// @route   GET /api/v1/post/:postId
// @access  Private

export const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    }
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, GET_SUCCESS_MESSAGES, post));
})



// @desc    DELETEPOST
// @route   GET /api/v1/post/:postId
// @access  Private

export const deletePost = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    if (!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UNAUTHORIZED);
    };

    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };

    const post = await Post.findOne({ _id: postId, postedBy: userId});
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    };

    await Post.findByIdAndDelete(postId);
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, DELETED_SUCCESS_MESSAGES));
})




// @desc    LIKE&UNLIKEPOST
// @route   GET /api/v1/likePost/:postId
// @access  Private

export const likeUnlikePost = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    if (!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UNAUTHORIZED);
    };

    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };

    const post = await Post.findOne({ _id: postId });
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    };

    const isUserLikePost = post.likes.includes(userId);
    if (isUserLikePost) {
        // unlikedPost
        await Post.updateOne({_id: postId}, {$pull: {likes: userId} });
    } else {
        // likedPost
        await Post.updateOne({_id: postId}, {$push: {likes: userId} });
    };
    res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, isUserLikePost? "User unLiked post" : "User liked post"));
})




// @desc    LIKE&UNLIKEPOST
// @route   GET /api/v1/reply/:postId
// @access  Public

export const replyToPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id; 
    if (!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UNAUTHORIZED);
    };

    const { postId } = req.params;
    if (!postId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, EMPTY_URL_PARAMS);
    };
    
    const { text } = req.body;
    const { error } = postSchema.validate({ text });
    if (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.details[0].message);
    };

    const post = await Post.findOne({ _id: postId });
    if (!post) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_DATA_FOUND);
    };

    const reply = { userId, text, userProfilePic: req.user?.profilePic || null, userName: req.user?.userName || "Anonymous" };
    await Post.findByIdAndUpdate(postId, 
        {
            $push: { 
                replies: {
                    userId,
                    text,
                    userProfilePic: req.user?.profilePic || null, 
                    userName: req.user?.userName || "Anonymous",
                }
            } 
        },  { new: true, runValidators: true } ); 
    return res.status(StatusCodes.OK).send( new ApiResponse(StatusCodes.OK, ADD_SUCCESS_MESSAGES, { reply }));
    
    // why run validotor: By default, Mongoose only applies validations when creating or saving a document, not when using findByIdAndUpdate or other findAndModify methods. Based on your Post Schema, it will validate fields inside the replies array when adding a new reply.
})



// @desc    LIKE&UNLIKEPOST
// @route   GET /api/v1/reply/:postId
// @access  Public

export const getFeed = asyncHandler(async (req, res) => {
    const userId = req.user?._id; 
    if (!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, UNAUTHORIZED);
    };
    
    const user = await User.findById(userId).select("following").lean();
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    };

    const following = user.following;

    if (!following || following.length === 0) {
        return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, []));
    }
    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 }).lean();
    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, feedPosts));
})