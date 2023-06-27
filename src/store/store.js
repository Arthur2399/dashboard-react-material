import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { clientSlice, communitySlice, companyInfoSlice, contractSlice, menuSlice, paymentTermSlice, plansDetailsSlice, plansSlice, servicesSlice, contractDetailsSlices } from "./modules";
import { changePasswordSlice } from "./modules/configuration/changePassword/changePasswordSlice";
import { closeReasonSlice } from "./modules/suscripciones/slices/closeReasonSlice";

export const store = configureStore({
    reducer: {

        closeReason: closeReasonSlice.reducer,
        client: clientSlice.reducer,
        contractDetails: contractDetailsSlices.reducer,
        contract: contractSlice.reducer,

        auth: authSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        menu: menuSlice.reducer,
        paymentTerm: paymentTermSlice.reducer,
        plans: plansSlice.reducer,
        plansDetails: plansDetailsSlice.reducer,
        services: servicesSlice.reducer,
    }
});