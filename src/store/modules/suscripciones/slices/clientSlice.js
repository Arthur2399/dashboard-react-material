import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        isLoading: false,
        clients: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActiveClient: (state, { payload }) => {
            state.active = payload;
        },
        onLoadClients: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(client => {
                const exists = state.clients.some(dbClient => dbClient.id === client.id);
                if (!exists) {
                    state.clients.push(client)
                }
            })
        },


        /*       onAddNewEvent: ( state, { payload }) => {
                  state.events.push( payload );
                  state.activeEvent = null;
              },
              onUpdateEvent: ( state, { payload } ) => {
                  state.events = state.events.map( event => {
                      if ( event.id === payload.id ) {
                          return payload;
                      }
      
                      return event;
                  });
              },
              onDeleteEvent: ( state ) => {
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

    }
})

export const { onIsLoading, onLoadClients, onSetActiveClient } = clientSlice.actions;