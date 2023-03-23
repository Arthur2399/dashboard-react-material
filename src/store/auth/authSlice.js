import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        email: null,
        name: null,
        photoURL: null,
        token: null,
        multicompany: false,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.email = payload.email;
            state.name = payload.username;
            state.photoURL = payload.imagen;
            state.token = payload.token;
            state.multicompany = payload.multicompany; // Vericar nombre con el API
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authtenticated';
            state.email = null;
            state.name = null;
            state.photoURL = null;
            state.token = null;
            state.multicompany = false;
            state.errorMessage = payload;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;