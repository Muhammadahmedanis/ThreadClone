import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "user",
    },
    otp: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    expiresIn: {
        type: Date
    },
    refreshToken: {
        type: String,
    },
    followers: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    },
    threads: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    },
    replies: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    },
    reposts: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    },
    // following: {
    //     type: [String],
    // },
    bio: {
        type: String,
        default: "",
    }
}, {timestamps: true}
)

// Method for bcrypt password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})


//Method for compare password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}


//Method for GenerateToken
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}


//Method for AccessToken
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema);