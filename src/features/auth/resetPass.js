import { createSlice } from "@reduxjs/toolkit";

export const resetPassSlice = createSlice({
    name: "resetPass",
    initialState: {
        resetPass: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        resetPass: (state, action) => {
            state.resetPass = action.payload;
            state.loading = false;
        },
    },
});

export const { resetPass ,fetchStart} = resetPassSlice.actions;
export default resetPassSlice.reducer;
