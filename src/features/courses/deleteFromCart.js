import { createSlice } from "@reduxjs/toolkit";

export const deleteFromCartSlice = createSlice({
    name: "deleteFromCart",
    initialState: {
        deleteFromCart: {},
        loading: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        deleteFromCart: (state, action) => {
            state.deleteFromCart = action.payload;
            state.loading = false;
        },
    },
});

export const { deleteFromCart ,fetchStart} = deleteFromCartSlice.actions;
export default deleteFromCartSlice.reducer;
