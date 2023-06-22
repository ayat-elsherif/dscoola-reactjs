import { createSlice } from "@reduxjs/toolkit";

export const cartListSlice = createSlice({
    name: "cartList",
    initialState: {
        cartList: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        cartList: (state, action) => {
            state.cartList = action.payload;
            state.loading = false;
        },
    },
});

export const { cartList ,fetchStart} = cartListSlice.actions;
export default cartListSlice.reducer;
