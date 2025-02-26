import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";

// ✅ Fetch user profile
export const getUser = createAsyncThunk("user/get", async (userName, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`user/profile/${userName}`);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch user");
        return rejectWithValue(error.response?.data?.message);
    }
});

// ✅ Follow/Unfollow user
export const followUnfollowUser = createAsyncThunk("user/follow", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`user/follow/${id}`); // Changed to POST
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Follow/Unfollow failed");
        return rejectWithValue(error.response?.data?.message);
    }
});

// ✅ Define initial state
const initialState = {
    userProfile: null, 
    error: null, 
    followingStatus: null
};

// ✅ User slice
const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            // ✅ Handle getUser
            .addCase(getUser.pending, (state) => {
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // ✅ Handle followUnfollowUser
            .addCase(followUnfollowUser.pending, (state) => {
                state.error = null;
            })
            .addCase(followUnfollowUser.fulfilled, (state, action) => {
                state.followingStatus = action.payload?.isFollowing;
            })
            .addCase(followUnfollowUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
