import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import {
    accountingPlanStructureSlice,
    changePasswordSlice,
    clientSlice,
    closeReasonSlice,
    communitySlice,
    companyInfoSlice,
    contractDetailsSlices,
    contractSlice,
    menuSlice,
    paymentTermSlice,
    plansDetailsSlice,
    plansSlice,
    servicesSlice,
} from "./modules";


export const store = configureStore({
    reducer: {

        /* Contabilidad */
        accPlanStructure: accountingPlanStructureSlice.reducer,

        /* suscripciones */
        client: clientSlice.reducer,
        closeReason: closeReasonSlice.reducer,
        contract: contractSlice.reducer,
        contractDetails: contractDetailsSlices.reducer,
        paymentTerm: paymentTermSlice.reducer,
        plans: plansSlice.reducer,
        plansDetails: plansDetailsSlice.reducer,
        services: servicesSlice.reducer,

        /* Sistema */
        auth: authSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        menu: menuSlice.reducer,
    }
});