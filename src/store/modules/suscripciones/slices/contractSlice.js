import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
    name: 'contract',
    initialState: {
        active: null,
        contract: [],
        errorMessage: null,
        isLoading: false,
        serverMessage: null,
    },
    reducers: {

        onIsLoadingContracts: (state) => {
            state.isLoading = true;
        },

        onSetActiveContract: (state, { payload }) => {
            state.active = payload;
        },

        onLoadContract: (state, { payload = [] }) => {
            state.isLoading = false;
            payload.forEach(item => {
                const exists = state.contract.some(dbItem => dbItem.id === item.id);
                if (!exists) {
                    state.contract.push(item)
                }
            })
        },

        onAddNewContract: (state, { payload }) => {
            if (payload.id === 0) return;
            state.contract.push(payload);
            state.active = null;
        },

        onUpdateContract: (state, { payload }) => {
            state.contract = state.contract.map(plan => {
                if (plan.id === payload.id) {
                    return payload;
                }
                return plan;
            });
        },

        onConfirmDeleteContract: (state,) => {
            state.confirm = true
        },

        onSendErrorMessageContract: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },

        onSendServerErrorMessageContract: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },

        onClearMessageContract: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        },

    }
})

export const {
    onAddNewContract,
    onClearMessageContract,
    onConfirmDeleteContract,
    onIsLoadingContracts,
    onLoadContract,
    onSendErrorMessageContract,
    onSendServerErrorMessageContract,
    onSetActiveContract,
    onUpdateContract,
} = contractSlice.actions;