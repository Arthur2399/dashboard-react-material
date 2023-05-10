import { createSlice } from "@reduxjs/toolkit";


export const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState: {
        isSaving: false,
        messageError: null,
        serverErrorMessage: null,
    },
    reducers: {
        savingChanges: (state) => {
            state.isSaving = true;
            state.messageError = null;
            state.serverErrorMessage = null;
        },
        sendErrorMessage: (state, { payload }) => {
            state.isSaving = false;
            state.messageError = payload;
        },
        sendServerErrorMessage: (state, { payload }) => {
            state.isSaving = false;
            state.serverErrorMessage = payload;
        },

        clearValues:(state)=>{
            state.isSaving = false;
            state.messageError = null;
            state.serverErrorMessage = null; 
        }
    }

})

export const { savingChanges, sendErrorMessage, sendServerErrorMessage, clearValues } = changePasswordSlice.actions;