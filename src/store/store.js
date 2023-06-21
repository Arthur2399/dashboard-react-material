import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clientSlice, communitySlice, companyInfoSlice, contractSlice, menuSlice, paymentTermSlice, plansDetailsSlice, plansSlice, servicesSlice, contractDetailsSlices } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";

export const store = configureStore({
    reducer: {

        contractDetails: contractDetailsSlices.reducer,
        contract: contractSlice.reducer,

        auth: authSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        client: clientSlice.reducer,
        community: communitySlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        menu: menuSlice.reducer,
        paymentTerm: paymentTermSlice.reducer,
        plans: plansSlice.reducer,
        plansDetails: plansDetailsSlice.reducer,
        services: servicesSlice.reducer,
    }
});