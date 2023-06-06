import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clientSlice, communitySlice, companyInfoSlice, menuSlice, paymentTermSlice, plansDetailsSlice, plansSlice, servicesSlice } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {
        services: servicesSlice.reducer,
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