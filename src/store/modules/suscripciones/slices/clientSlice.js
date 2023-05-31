import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        isLoading: false,
        clients: [],
        confirm: false,
        active: null,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveClient: (state, { payload }) => {
            state.active = payload;
        },
        onLoadClients: (state, { payload = [] }) => {
            state.isLoading = false;
            // state.events = payload;
            payload.forEach(client => {
                const exists = state.clients.some(dbClient => dbClient.id === client.id);
                if (!exists) {
                    state.clients.push(client)
                }
            })
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


        /*       onDeleteEvent: ( state ) => {
               if ( state.activeEvent ) {
                   state.events = state.events.filter( event => event.id !== state.activeEvent.id );
                   state.activeEvent = null;
               }
           },
   
           onLogoutCalendar: ( state ) => {
               state.isLoadingEvents = true,
               state.events      = []
               state.activeEvent = null
           } */

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
    onLoadClients,
    onSetActiveClient,
    onAddNewClient,
    onUpdateClient,
    sendErrorMessage,
    sendServerErrorMessage,
    clearMessage,
    onConfirmDelete
} = clientSlice.actions;