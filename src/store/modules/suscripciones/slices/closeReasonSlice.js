import { createSlice } from "@reduxjs/toolkit";

export const closeReasonSlice = createSlice({
    name: 'closeReason',
    initialState: {
        isLoading: false,
        active: null,
        reasons: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveReason: (state, { payload }) => {
            state.active = payload;
        },
        onLoadreasons: (state, { payload = [] }) => {
            state.isLoading = false;
            state.reasons = payload
        },

        onAddNewReason: (state, { payload }) => {
            if (payload.id === 0) return;
            state.reasons.push(payload);
            state.active = null;
        },

        onUpdateReason: (state, { payload }) => {
            state.reasons = state.reasons.map(reason => {
                if (reason.id === payload.id) {
                    return payload;
                }
                return reason;
            });
        },

        onConfirmDelete: (state,) => {
            state.confirm = true
        },
        onSendErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onSendServerErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        onClearMessage: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})

export const {
    onIsLoading,
    onLoadreasons,
    onSetActiveReason,
    onAddNewReason,
    onUpdateReason,
    onConfirmDelete,
    onSendErrorMessage,
    onSendServerErrorMessage,
    onClearMessage,
} = closeReasonSlice.actions;