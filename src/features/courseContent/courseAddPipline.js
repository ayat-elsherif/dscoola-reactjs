import { createSlice } from "@reduxjs/toolkit";

export const courseAddPiplineSlice = createSlice({
    name: "courseAddPipline",
    initialState: {
        courseAddPipline: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state, action) => {
            state.loading = action.payload;
        },
        courseAddPipline: (state, action) => {
            state.courseAddPipline = action.payload;
            
        },
    },
});

export const { courseAddPipline ,fetchStart} = courseAddPiplineSlice.actions;
export default courseAddPiplineSlice.reducer;
