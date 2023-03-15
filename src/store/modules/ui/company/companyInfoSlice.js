import { createSlice } from "@reduxjs/toolkit";

export const companyInfoSlice = createSlice({
    name: 'companyInfo',
    initialState: {
        status: 'no-selected',
        companies :  [],
        selectedCompany: null,
        /* 
            selectCompany:{
                id: null,
                name: null,
                ruc: null, 
            }
        */
    },
    reducers: {

        LoadingCompanies: (state) => {
            state.status = 'loading';
        },

        gettingCompanies: (state, {payload}) =>{
            state.status = 'getting-cpmpanies'
            state.companies = payload.companies
        },

        unselectedCompany: (state) => {
            state.status = 'no-selected';
        },

        selectedCompany: (state, { payload }) => {
            state.status = 'selected';
            state.selectedCompany = payload.selectCompany;

        },

        clearCompany: (state) => {
            state.status = 'no-selected';
            state.companies = [];
            state.selectedCompany = null;

        }

    }
});

export const { se } = companyInfoSlice.actions;