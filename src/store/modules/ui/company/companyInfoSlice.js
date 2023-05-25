import { createSlice } from "@reduxjs/toolkit";

export const companyInfoSlice = createSlice({
    name: 'companyInfo',
    initialState: {
        status: 'no-companies',
        companies: [],
        currentCompany: null,
    },

    reducers: {

        //Estado de carga
        loadingCompanies: (state) => {
            state.status = 'loading';
        },

        //Selección de empresa
        gettingCompanies: (state, { payload }) => {
            state.status = 'getting-companies'
            state.companies = payload
            state.currentCompany = null;
        },

        unselectedCompany: (state) => {
            state.status = 'no-selected';
        },

        selectCompany: (state, { payload }) => {
            state.status = 'selected';
            state.currentCompany = payload;
        },

        setCompanies: (state, {payload}) => {
            state.companies = payload;
        },

        changeCompany: (state) => {
            state.status = 'no-selected';
            state.currentCompany = null;
        },

        //Salida del sistema
        clearCompany: (state) => {
            state.status = 'no-companies';
            state.companies = [];
            state.currentCompany = null;
        },


    }
});

export const {
    loadingCompanies,
    gettingCompanies,
    unselectedCompany,
    selectCompany,
    setCompanies,
    changeCompany,
    clearCompany,
} = companyInfoSlice.actions;