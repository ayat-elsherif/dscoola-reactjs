import { createSlice } from "@reduxjs/toolkit";

export const oneOnOneSlice = createSlice({
    name: "oneOnOne",
    initialState: {
        availableDays: {},
        availableSlots: {},
    },
    reducers: {
        fetchAvailableDays: (state,action) => {
            state.availableDays = action.payload;
        },
        fetchAvailableSlots: (state, action) => {
            state.availableSlots = action.payload;
             
        },
    },
});

export const { fetchAvailableDays ,fetchAvailableSlots} = oneOnOneSlice.actions;
export default oneOnOneSlice.reducer;
