import { createSlice } from "@reduxjs/toolkit";

export const plansSlice = createSlice({
    name: 'plans',
    initialState: {
        isLoadingCommunity: false,
        comunities: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {

        onIsLoading: (state)=>{
            state.isLoadingCommunity=true;
        },

        onClearValues: (state)=> {
            state.isLoadingCommunity= false;
            state.comunities= [];
            state.active= null;
            state.serverMessage= null;
            state.errorMessage= null;
        },
    }
})

export const { onIsLoading, onClearValues } = plansSlice.actions;