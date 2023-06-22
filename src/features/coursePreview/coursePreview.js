import { createSlice } from "@reduxjs/toolkit";

export const coursePreviewSlice = createSlice({
    name: "coursePreview",
    initialState: {
        loadedLecInfo: {},
         
    },
    reducers: {
         
        loadedLecInfo: (state, action) => {
            state.loadedLecInfo = action.payload;
             
        },
    },
});

export const { loadedLecInfo } = coursePreviewSlice.actions;
export default coursePreviewSlice.reducer;
