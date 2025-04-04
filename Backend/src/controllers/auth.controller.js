import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from 'uuid'
import { sendEmailLink, sendEmailOTP } from '../utils/sendEmail.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { responseMessages } from "../constant/responseMessages.js";
const { MISSING_FIELDS, USER_EXISTS, UN_AUTHORIZED, SUCCESS_REGISTRATION, NO_USER, SUCCESS_LOGIN, INVALID_OTP, OTP_EXPIRED, EMAIL_VERIFY, SUCCESS_LOGOUT, MISSING_FIELD_EMAIL_PASSWORD, UNAUTHORIZED_REQUEST, GET_SUCCESS_MESSAGES, RESET_LINK_SUCCESS, PASSWORD_CHANGE, NOT_VERIFY, PASSWORD_AND_CONFIRM_NO_MATCH, UPDATE_UNSUCCESS_MESSAGES, MISSING_FIELD_EMAIL, RESET_OTP_SECCESS, INVALID_TOKEN, TOKEN_EXPIRED, SUCCESS_TOKEN, INVALID_DATA, NO_DATA_FOUND, IMAGE_SUCCESS, IMAGE_ERROR , UPDATE_SUCCESS_MESSAGES, UNAUTHORIZED, NOT_ALLOWED} = responseMessages

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById( userId );
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});        
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
}



// @desc    SIGNUP
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if ([userName, email, password].some((field) => typeof field !== "string" || field.trim() === "")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELDS);
    }

    const [isUserExist, otp] = await Promise.all([
        User.findOne({ $or: [{ userName }, { email }] }).lean(),
        uuidv4().slice(0, 6) // Generate OTP
    ]);
    if (isUserExist) {
        throw new ApiError(StatusCodes.CONFLICT, USER_EXISTS);
    }

    const otpExpiry = Date.now() + 600000; // 10 minutes expiry
    const newUser = await User.create({
        userName,
        email,
        password,
        otp,
        expiresIn: otpExpiry,
    });

    const emailSent = await sendEmailOTP(email, otp);
    if (!emailSent) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, EMAIL_ERROR);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);
    const options = {
        httpOnly: true, // Cookie can't be accessed via JavaScript
        secure: true, // Only set to true in production (use HTTPS)
        sameSite: 'none', // Ensure it works with cross-site cookies
    };

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res
        .status(StatusCodes.CREATED)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .send(new ApiResponse(StatusCodes.OK, SUCCESS_REGISTRATION, userResponse, accessToken, refreshToken ))
});




// @desc    RESEND-OTP
// @route   POST api/v1/user/resendOtp
// @access  Private

export const resendOtp = asyncHandler( async (req, res) => {
        const { email, _id } = req.body;

        // Validate input
        if (!email || !_id) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(new ApiError(StatusCodes.BAD_REQUEST, UN_AUTHORIZED));
        }

        // Check if the user exists
        const isUser = await User.findOne({ email, _id });
        if (!isUser) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(new ApiError(StatusCodes.NOT_FOUND, NO_USER));
        }

        // Generate new OTP
        const newOtp = uuidv4().slice(0, 6);

        // Update OTP and expiration time
        isUser.otp = newOtp;
        isUser.expiresIn = Date.now() + 600000; // 10 minutes
        await isUser.save({ validateBeforeSave: false });

        // Send OTP email
        await sendEmailOTP(email, newOtp);

        // Return success response
        return res
            .status(StatusCodes.OK)
            .send(new ApiResponse(StatusCodes.OK, RESET_OTP_SECCESS));
    } 
);



// @desc    VERIFY EMAIL
// @route   POST /api/user/verifyEmail
// @access  Private

export const verifyEmail = asyncHandler(async (req, res) => {
        const { otp } = req.body;
        
        // Validate the input
        if (!otp) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send(new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELDS));
        }

        // Fetch the user
        // console.log(req);

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(new ApiError(StatusCodes.NOT_FOUND, USER_NOT_FOUND));
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .send(new ApiError(StatusCodes.FORBIDDEN, INVALID_OTP));
        }

        // Check OTP expiration
        const EXPIRE_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
        if (user.createdAt + EXPIRE_TIME < Date.now()) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .send(new ApiError(StatusCodes.FORBIDDEN, OTP_EXPIRED));
        }

        // Mark the user as verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.expiresIn = undefined;
       // Save without validation checks
        await user.save({ validateBeforeSave: false });

        // Send success response
        return res
            .status(StatusCodes.OK)
            .send(new ApiResponse(StatusCodes.OK, EMAIL_VERIFY, { email: user.email, isVerified: user.isVerified }));
    } 
);



// @desc    SIGNIN
// @route   POST /api/v1/auth/signin
// @access  Public

export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELD_EMAIL_PASSWORD);
    }
    
    const user = await User.findOne({email});
    
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }
    
    const isPaswordValid = await user.isPasswordCorrect(password);
    
    if (!isPaswordValid) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UN_AUTHORIZED);
      }
      
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
    const loggedInusers = await  User.findById(user._id).select("-password -refreshToken");
    
    const options = {
        httpOnly: true, // Cookie can't be accessed via JavaScript
        secure: true, // Only set to true in production (use HTTPS)
        sameSite: 'none', // Ensure it works with cross-site cookies
    }
    return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new ApiResponse(StatusCodes.OK,  SUCCESS_LOGIN, loggedInusers, accessToken ))
})


// @desc    GOOGLESIGNIN
// @route   POST /api/v1/auth/signin
// @access  Public

export const googleSignin = asyncHandler(async (req, res) => {
    const { email, userName, isVerified} = req.body;
    if(!email || !userName || !isVerified){
        throw new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELD_EMAIL_PASSWORD);
    }
    if (isVerified != true) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, NOT_VERIFY);
    };
    
    const user = await User.findOne({ 
        $and: [{ userName: { $regex: new RegExp(`^${userName}$`, "i") } }, { email: { $regex: new RegExp(`^${email}$`, "i") } }] 
    });
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, NO_USER);
    }
    
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
    const loggedInusers = await  User.findById(user._id).select("-password, -refreshToken");
    
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new ApiResponse(StatusCodes.OK, 
        SUCCESS_LOGIN,
        {user: loggedInusers, accessToken, SUCCESS_LOGIN },
    ))
})



// @desc    LOGOUT
// @route   POST api/v1/auth/logout
// @access  Public

export const logout = asyncHandler(async (req, res) => {
    
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 } // remove field from document 
    }, { new: true });

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    }

    res
    .status(StatusCodes.OK)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .send(new ApiResponse(StatusCodes.OK,  SUCCESS_LOGOUT, {}));
})


// @desc    FORGOT-PASSWORD-EMAIL
// @route   POST api/v1/auth/forgotPasswordEmail
// @access  Public

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json(new ApiError(StatusCodes.BAD_REQUEST, MISSING_FIELD_EMAIL));
    }

    const user = await User.findOne({ email }).select("isVerified refreshToken");
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json(new ApiError(StatusCodes.NOT_FOUND, NO_USER_FOUND));
    }
    if (!user.isVerified) {
        return res.status(StatusCodes.FORBIDDEN).json(new ApiError(StatusCodes.FORBIDDEN, NOT_VERIFY));
    }

    const resetLink = `${process.env.ALLOWED_ORIGIN_1}/change-password/${user.refreshToken}`;
    sendEmailLink(email, resetLink)
        .then(() => console.log("Reset email sent successfully"))
        .catch((err) => console.error("Error sending reset email:", err));

    return res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, RESET_LINK_SUCCESS));
});





// @desc    CHANGE-CURRENT-PASSWORD
// @route   PUT api/v1/user/resetPasswordEmail
// @access  Private

export const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { token } = req.params
    const refreshToken = token;

     const user = await User.findOne({ refreshToken: refreshToken });
    console.log(user);
    
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(StatusCodes.BAD_REQUEST, INVALID_DATA);
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(StatusCodes.OK).send(new ApiResponse(StatusCodes.OK, PASSWORD_CHANGE, {}));
});



export const refreshAccessToken =  asyncHandler(async (req, res) => {
    const getRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!getRefreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, UNAUTHORIZED_REQUEST);
    }

    try {
        const decodedToken = jwt.verify(getRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(decodedToken);
        
        const user = await User.findById(decodedToken?._id);
        if(!user){
            throw new ApiError(StatusCodes.UNAUTHORIZED, INVALID_TOKEN);
        }
    
        if (getRefreshToken !== user?.refreshToken) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, TOKEN_EXPIRED);
        }
    
        const options = {
            httpOnly: true,
            secure: true,
        }
    
        const { accessToken, newRefreshToken }  = await generateAccessAndRefreshToken(user._id);
        
        return res
        .status(StatusCodes.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .send(new ApiResponse(StatusCodes.OK, 
            { accessToken, newRefreshToken, SUCCESS_TOKEN },
        ))
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED,  error.message)
    }

})

