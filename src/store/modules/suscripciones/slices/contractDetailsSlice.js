import { createSlice } from "@reduxjs/toolkit";

export const contractDetailsSlices = createSlice({
    name: 'contractDetails',
    initialState: {
        isLoading: false,
        headerContract: null,
        details: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {
        onIsLoadingDetailsContract: (state) => {
            state.isLoading = true;
        },

        onSetHeaderContract: (state, { payload }) => {
            state.headerContract = payload;
        },
        onSetActiveDetailsContract: (state, { payload }) => {
            state.active = payload;
        },
        onLoadDetailsContract: (state, { payload = [] }) => {
            state.isLoading = false;
            state.details = payload;
        },
        onAddNewDetailsContract: (state, { payload }) => {
            if (payload.id === 0) return;
            state.details.push(payload);
            state.active = null;
        },

        onUpdateDetailsContract: (state, { payload }) => {
            state.details = state.details.map(detail => {
                if (detail.id === payload.id) {
                    return payload;
                }
                return detail;
            });
        },

        onConfirmDeleteDetailsContract: (state,) => {
            state.confirm = true
        },
        sendErrorMessageDetailsContract: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        sendServerErrorMessageDetailsContract: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        clearMessageDetailsContract: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})

export const {
    onIsLoadingDetailsContract,
    onSetHeaderContract,
    onSetActiveDetailsContract,
    onLoadDetailsContract,
    onAddNewDetailsContract,
    onUpdateDetailsContract,
    onConfirmDeleteDetailsContract,
    sendErrorMessageDetailsContract,
    sendServerErrorMessageDetailsContract,
    clearMessageDetailsContract,
} = contractDetailsSlices.actions;