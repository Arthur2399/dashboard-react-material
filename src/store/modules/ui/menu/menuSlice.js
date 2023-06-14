import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        status: 'No-checking',
        modules: [],
    },
    reducers: {
        checkingAccess: (state) => {
            state.status = 'checking';
        },
        getModules: (state, {payload}) => {
            state.status = 'complete';
            state.modules = payload;

        },
        clearModule: (state) => {
            state.status = 'not-complete';
            state.modules = [];
        }
    }
});

export const { checkingAccess, getModules, clearModule } = menuSlice.actions;