import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { companyInfoSlice, menuSlice } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {
        //Authentication
        auth: authSlice.reducer,
        
        //UI Interface de usuario menu y seleccion de empresa
        companyInfo: companyInfoSlice.reducer,
        
        //Menu dinamico segun el rol
        menu: menuSlice.reducer,

        changePassword: changePasswordSlice.reducer,
        

    }
});