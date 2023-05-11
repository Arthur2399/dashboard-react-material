import { createSlice } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        isSaving: false,
        errorMessage: null,
        serverMessage: null,
        comunities: [],
        active: null
    },
    reducers: {
        savingChanges: (state) => {
            state.isSaving = true;
        },

        getCommunities: (state,{payload}) => {
            state.comunities =  payload;
        },

        addNewCommunity: (state) => {
        },
    }
})

export const { savingChanges, addNewCommunity, getCommunities} = communitySlice.actions;