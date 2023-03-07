import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name:'menu',
    initialState:{
        status:'checking',
        modules:[],
    },
    reducers:{
        checkingAccess:()=>{
            state.status='checking',
            state.modules= []
        },
        getModules: (state, payload) =>{
            state.status='complete',
            state.modules= payload.items
        },
        clearModule: (state) =>{
            state.status='not-complete',
            state.modules= []
        }

    }
});

export const {checkingCredentials,getModules,clearModule} = menuSlice.actions;