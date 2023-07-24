import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        status: 'no-checking',
        modules: [],
        isLoading:false,
    },
    reducers: {
        checkingAccess: (state) => {
            state.status = 'checking';
            state.isLoading = true;
        },
        getModules: (state, {payload}) => {
            state.isLoading= false;
            state.status = 'complete';
            state.modules = payload;

        },
        clearModule: (state) => {
            state.status = 'no-checking';
            state.isLoading= false;
            state.modules = [];
        }
    }
});

export const { checkingAccess, getModules, clearModule } = menuSlice.actions;