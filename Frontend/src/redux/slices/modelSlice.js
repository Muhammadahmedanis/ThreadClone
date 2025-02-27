import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postModel: false,
    editModel: false,
    themeMode: localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : "light",
}

export const modelSlice =  createSlice({
    name: "model",
    initialState,
    reducers:{
        openPostModel: (state, action) => {
            state.postModel = action.payload;
        },
        openEditModel: (state, action) => {
            state.editModel = action.payload;
        },
        theme: (state) => {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
            localStorage.setItem("theme", JSON.stringify(state.themeMode));  // Store new theme in localStorage
        }

    }
});

export const { openPostModel, openEditModel, theme } = modelSlice.actions;
export default modelSlice.reducer;