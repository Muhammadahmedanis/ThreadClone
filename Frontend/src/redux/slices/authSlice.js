import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";


export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`auth/signup`, userData);
        toast.success(response.data?.message);
        localStorage.setItem("user", JSON.stringify({ userName: response.data.data.userName, role: response.data.data.role, id: response.data.data._id }));
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

export const signinUser = createAsyncThunk("auth/signin", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`auth/signin`, userData);
        toast.success(response.data?.message);
        localStorage.setItem("user", JSON.stringify({ userName: response.data.data.userName, role: response.data.data.role, id:  response.data.data._id }));
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    const response = await axiosInstance.post(`auth/logout`);
    toast.success(response.data?.message);
    localStorage.removeItem("user");
    return null;
});

// Verify OTP
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (otp, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`auth/verify-email`, { otp });
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});

// Resend OTP
export const resendOtp = createAsyncThunk("auth/resendOtp", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/auth/resend-otp", userData);
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});


// Update User Profile (with FormData)
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`user/updateProfile`, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        toast.success(response.data?.message);
        // Update local storage with the new username
        const storedUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify({ ...storedUser, userName: response.data.data.userName }));

        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
});



// Auth Slice
const authSlice = createSlice({
    name: "Auth",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = { ...state.user, userName: action.payload.data.userName };
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;