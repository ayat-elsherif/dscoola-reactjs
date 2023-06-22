import { createSlice } from "@reduxjs/toolkit";

export const forgetPassSlice = createSlice({
    name: "forgetPass",
    initialState: {
        forgetPass: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        forgetPass: (state, action) => {
            state.forgetPass = action.payload;
            state.loading = false;
        },
    },
});

export const { forgetPass ,fetchStart} = forgetPassSlice.actions;
export default forgetPassSlice.reducer;
