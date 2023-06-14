import { createSlice } from "@reduxjs/toolkit";

export const plansDetailsSlice = createSlice({
    name: 'plansDetails',
    initialState: {
        isLoading: false,
        headerPlan:null,
        details: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },
    
        onSetHeaderPlan: (state, { payload }) => {
          state.headerPlan= payload;  
        },
        onSetActivePlanDetails: (state, { payload }) => {
            state.active = payload;
        },
        onLoadPlansDetails: (state, { payload = [] }) => {
            state.isLoading = false;
            state.details = payload;
        },
        onAddNewPlanDetails: (state, { payload }) => {
            if (payload.id === 0) return;
            state.details.push(payload);
            state.active = null;
        },

        onUpdatePlanDetails: (state, { payload }) => {
            state.details = state.details.map(detail => {
                if (detail.id === payload.id) {
                    return payload;
                }
                return detail;
            });
        },

        onConfirmDelete: (state,) => {
            state.confirm = true
        },
        sendErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        sendServerErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        clearMessage: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})

export const {
    clearMessage,
    onAddNewPlanDetails,
    onConfirmDelete,
    onIsLoading,
    onLoadPlansDetails,
    onSetActivePlanDetails,
    onSetHeaderPlan,
    onUpdatePlanDetails,
    sendErrorMessage,
    sendServerErrorMessage,
} = plansDetailsSlice.actions;