import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        isLoading: false,
        active: null,
        clients: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoadingClient: (state) => {
            state.isLoading = true;
        },

        onSetActiveClient: (state, { payload }) => {
            state.active = payload;
        },
        onLoadClients: (state, { payload = [] }) => {
            state.isLoading = false;
            state.clients = payload
        },

        onAddNewClient: (state, { payload }) => {
            if (payload.id === 0) return;
            state.clients.push(payload);
            state.active = null;
        },

        onUpdateClient: (state, { payload }) => {
            state.clients = state.clients.map(client => {
                if (client.id === payload.id) {
                    return payload;
                }
                return client;
            });
        },

        onConfirmDeleteClient: (state,) => {
            state.confirm = true
        },
        onSendErrorMessageClient: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onSendServerErrorMessageClient: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        onClearMessageClient: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        },
        onDeleteClient: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLogoutClient: (state) => {
            state.isLoadingEvents = false,
                state.events = []
            state.activeEvent = null
        }
    }
})

export const {

    onIsLoadingClient,
    onSetActiveClient,
    onLoadClients,
    onAddNewClient,
    onUpdateClient,
    onConfirmDeleteClient,
    onSendErrorMessageClient,
    onSendServerErrorMessageClient,
    onClearMessageClient,
    onDeleteClient,
    onLogoutClient,

} = clientSlice.actions;