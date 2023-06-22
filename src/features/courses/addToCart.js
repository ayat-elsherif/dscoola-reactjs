import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {
        addToCart: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        addToCart: (state, action) => {
            state.addToCart = action.payload;
            state.loading = false;
        },
    },
});

export const { addToCart ,fetchStart} = addToCartSlice.actions;
export default addToCartSlice.reducer;
