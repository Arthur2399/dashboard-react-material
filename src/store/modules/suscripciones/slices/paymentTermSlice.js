import { createSlice } from "@reduxjs/toolkit";

export const paymentTermSlice = createSlice({
    name: 'paymentTerm',
    initialState: {
        isLoading: false,
        paymenyTerms: [],
        confirm: false,
        active: null,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActivePaymentTerm: (state, { payload }) => {
            state.active = payload;
        },
        onLoadingPaymentTerm: (state, { payload = [] }) => {
            state.isLoading = false;
            state.paymenyTerms = payload
        },

        onAddNewPaymentTerm: (state, { payload }) => {
            if (payload.id === 0) return;
            state.paymenyTerms.push(payload);
            state.active = null;
        },

        onUpdatePaymentTerm: (state, { payload }) => {
            state.paymenyTerms = state.paymenyTerms.map(payment => {
                if (payment.id === payload.id) {
                    return payload;
                }
                return payment;
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
    }
})

export const {
    onIsLoading,
    onLoadingPaymentTerm,
    onSetActivePaymentTerm,
    onAddNewPaymentTerm,
    onUpdatePaymentTerm,
    sendErrorMessage,
    sendServerErrorMessage,
    clearMessage,
    onConfirmDelete
} = paymentTermSlice.actions;