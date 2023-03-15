import { createSlice } from "@reduxjs/toolkit";

export const companyInfoSlice = createSlice({
    name: 'companyInfo',
    initialState: {
        status: 'no-companies',
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

        loadingCompanies: (state) => {
            state.status = 'loading';
        },

        gettingCompanies: (state, {payload}) =>{
            state.status = 'getting-companies'
            state.companies = payload
            state.selectedCompany = null;
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

export const { loadingCompanies, gettingCompanies, unselectedCompany, selectedCompany,clearCompany } = companyInfoSlice.actions;