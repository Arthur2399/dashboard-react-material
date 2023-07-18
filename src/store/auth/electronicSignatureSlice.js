import { createSlice } from "@reduxjs/toolkit";

export const electronicSignatureSlice = createSlice({
    name: 'elecSignature',
    initialState: {
        isLoading: false,
        user: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoadingElecSignature: (state) => {
            state.isLoading = true;
        },
        onLoadUser: (state, { payload = [] }) => {
            state.isLoading = false;
            state.user = payload
        },
        onConfirm: (state) => {
            state.confirm = true;
        },
        onSendErrorMessageElecSignature: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onSendServerErrorMessageElecSignature: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        onClearElecSignature: () => {
            state.isLoading = false;
                state.user = [];
                state.confirm = false;
                state.errorMessage = null;
                state.serverMessage = null;
        }
    }
})
export const {
    onIsLoadingElecSignature,
    onLoadUser,
    onConfirm,
    onSendErrorMessageElecSignature,
    onSendServerErrorMessageElecSignature,
    onClearElecSignature,
} = electronicSignatureSlice.actions;