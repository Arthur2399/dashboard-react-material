import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authtenticated',
        email: null,
        name: null,
        photoURL: null,
        token: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'checking';
            state.email = payload.email;
            state.name = payload.name;
            state.photoURL = payload.photoURL;
            state.token = payload.token;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authtenticated';
            state.email = null;
            state.name = null;
            state.photoURL = null;
            state.token = null;
            state.errorMessage = payload?.detail;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;