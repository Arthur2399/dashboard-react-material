import { createSlice } from "@reduxjs/toolkit";

export const companyInfoSlice = createSlice({
    name: 'companyInfo',
    initialState: {
        status: 'no-selected',
        name: null,
        ruc: null,
    },
    reducers: {
        
        selectingCompany: (state) => {
            state.status = 'selecting';
        },

        selectedCompany: (state, {payload}) => {
            state.status = 'selected'
            state.name = payload.name;
            state.ruc = payload.ruc;
        },

        unselectedCompany: (state) =>{
            state.status = 'selecting';
            state.name = null;
            state.ruc = null;
        }

    }
});

export const { se } = companyInfoSlice.actions;