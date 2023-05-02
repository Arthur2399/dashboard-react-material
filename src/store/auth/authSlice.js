import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        email: null,
        name: null,
        job:null,
        photoURL: null,
        token: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.email = payload.email;
            state.name = payload.username;
            state.job = payload.job;
            state.photoURL = payload.photoURL;
            state.token = payload.token;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authtenticated';
            state.email = null;
            state.name = null;
            state.job = null;
            state.photoURL = null;
            state.token = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;