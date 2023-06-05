import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clientSlice, communitySlice, companyInfoSlice, menuSlice, paymentTermSlice, plansDetailsSlice, plansSlice } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {
        paymentTerm: paymentTermSlice.reducer,
        plansDetails: plansDetailsSlice.reducer,
        plans: plansSlice.reducer,
        auth: authSlice.reducer,
        menu: menuSlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        client: clientSlice.reducer,
    }
});