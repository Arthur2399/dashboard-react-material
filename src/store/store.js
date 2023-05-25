import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { communitySlice, companyInfoSlice, menuSlice } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        menu: menuSlice.reducer,
    }
});