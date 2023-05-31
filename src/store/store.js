import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clientSlice, communitySlice, companyInfoSlice, menuSlice, plansSlice } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        menu: menuSlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        plans: plansSlice.reducer,
        client: clientSlice.reducer,
    }
});