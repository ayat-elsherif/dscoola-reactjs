import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        
        isClicked:null,
    },
    reducers: {
        firePayment: (state,action,callBack=(res)=>res) => {
            state.isClicked = action.payload;
        },
       
    },
});

export const {firePayment} = paymentSlice.actions;
export default paymentSlice.reducer;
