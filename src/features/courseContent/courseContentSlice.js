import { createSlice } from "@reduxjs/toolkit";

export const courseContentSlice = createSlice({
    name: "courseContent",
    initialState: {
        openAddSectionForm: false,
        openAddLecTypesForm: "",
        openAddQuizTypesForm: "",
        openAddLecOrQuiz: "init",
        openLecOrQuizForm: "init",
        showAddLecIcon: "init",
        lecTypesBtnText: "init",
        lecTypeToggel: "init",
        addDesc:"init"
    },
    reducers: {
        fetchOpenSectionForm: (state, action) => {
            state.openAddSectionForm = action.payload;
        },
        fetchopenAddLecTypesForm: (state, action) => {
            state.openAddLecTypesForm = action.payload;
        },
        fetchopenAddQuizTypesForm: (state, action) => {
            state.openAddQuizTypesForm = action.payload;
        },
        fetchOpenAddLecOrQuiz: (state, action) => {
            state.openAddLecOrQuiz = action.payload;
        },
        fetchOpenLecOrQuizForm: (state, action) => {
            state.openLecOrQuizForm = action.payload;
        },
        fetchshowAddLecIcon: (state, action) => {
            state.showAddLecIcon = action.payload;
        },
        fetchlecTypesBtnText: (state, action) => {
            state.lecTypesBtnText = action.payload;
        },
        fetchlecTypeToggel: (state, action) => {
            state.lecTypeToggel = action.payload;
        },
        fetchaddDesc: (state, action) => {
            state.addDesc = action.payload;
        },
    },
});

export const {
    fetchOpenSectionForm,
    fetchopenAddLecTypesForm,
    fetchopenAddQuizTypesForm,
    fetchOpenAddLecOrQuiz,
    fetchOpenLecOrQuizForm,
    fetchshowAddLecIcon,    
    fetchlecTypesBtnText,
    fetchlecTypeToggel,
    fetchaddDesc
} = courseContentSlice.actions;
export default courseContentSlice.reducer;
