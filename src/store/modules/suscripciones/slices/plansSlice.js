import { createSlice } from "@reduxjs/toolkit";

export const plansSlice = createSlice({
    name: 'plans',
    initialState: {
        isLoading: false,
        plans: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {

        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetPlan: (state, { payload }) => {
            state.active = payload;
        },

        onClearValues: (state) => {
            state.isLoading = false;
            state.plans = [];
            state.active = null;
            state.serverMessage = null;
            state.errorMessage = null;
        },
    }
})

export const { onIsLoading, onSetPlan, onClearValues } = plansSlice.actions;