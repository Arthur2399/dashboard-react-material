import { createSlice } from "@reduxjs/toolkit";

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        isLoading: false,
        services: [],
        confirm: false,
        active: null,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActive: (state, { payload }) => {
            state.active = payload;
        },
        onLoad: (state, { payload = [] }) => {
            state.isLoading = false;
            state.services = payload
        },

        onAddNew: (state, { payload }) => {
            if (payload.id === 0) return;
            state.services.push(payload);
            state.active = null;
        },

        onUpdate: (state, { payload }) => {
            state.services = state.services.map(serv => {
                if (serv.id === payload.id) {
                    return payload;
                }
                return serv;
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
    onIsLoading,
    onSetActive,
    onLoad,
    onAddNew,
    onUpdate,
    onConfirmDelete,
    sendErrorMessage,
    sendServerErrorMessage,
    clearMessage,
} = servicesSlice.actions;