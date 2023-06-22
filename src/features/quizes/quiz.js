import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        quiz: "",
     },
    reducers: {
        
        quiz: (state, action) => {
            state.quiz = action.payload;
             
        },
    },
});

export const { quiz } = quizSlice.actions;
export default quizSlice.reducer;
