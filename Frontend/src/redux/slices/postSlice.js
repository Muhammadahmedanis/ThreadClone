import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios";
import toast from "react-hot-toast";

export const addPost = createAsyncThunk("post/create", async ( postData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`post/create`, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        toast.success(response.data?.message);
    } catch (error) {
        toast.error(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
    }
})

const initialState = {
    posts: [],
    loading: false,
    error: null,
}
const postSlice = createSlice({
    name: "Post",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(addPost.pending, (state) => {
            state.error = null;
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        })
        .addCase(addPost.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
})

export default postSlice.reducer;