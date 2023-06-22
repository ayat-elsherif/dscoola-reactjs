import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
    name: "signUp",
    initialState: {
        signUp: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        signUp: (state, action) => {
            state.signUp = action.payload;
            state.loading = false;
        },
    },
});

export const { signUp ,fetchStart} = signUpSlice.actions;
export default signUpSlice.reducer;
