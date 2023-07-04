import { createSlice } from "@reduxjs/toolkit";

export const accountingPlanStructureSlice = createSlice({
    name: 'accPlanStructure',
    initialState: {
        isLoading: false,
        active: null,
        accPlanStructures: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoadingAccPlanStructure: (state) => {
            state.isLoading = true;
        },
        onSetActiveAccPlanStructure: (state, { payload }) => {
            state.active = payload;
        },
        onLoadAccPlanStructure: (state, { payload = [] }) => {
            state.isLoading = false;
            state.accPlanStructures = payload
        },
        onAddNewAccPlanStructure: (state, { payload }) => {
            if (payload.id === 0) return;
            state.accPlanStructures.push(payload);
            state.active = null;
        },
        onUpdateAccPlanStructure: (state, { payload }) => {
            state.accPlanStructures = state.accPlanStructures.map(accPlanStructure => {
                if (accPlanStructure.id === payload.id) {
                    return payload;
                }
                return accPlanStructure;
            });
        },
        onConfirmDeleteAccPlanStructure: (state,) => {
            state.confirm = true
        },
        sendErrorMessageAccPlanStructure: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        sendServerErrorMessageAccPlanStructure: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        clearMessageAccPlanStructure: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})
export const {
} = accountingPlanStructureSlice.actions;