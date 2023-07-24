import { configureStore } from "@reduxjs/toolkit";
import { authSlice, electronicSignatureSlice } from "./auth";
import {
    accountingPlanSlice,
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
        accountingPlan: accountingPlanSlice.reducer,
        accPlanStructure: accountingPlanStructureSlice.reducer,

        /* Sistema */
        elecSignature: electronicSignatureSlice.reducer,
        auth: authSlice.reducer,
        companyInfo: companyInfoSlice.reducer,
        changePassword: changePasswordSlice.reducer,
        community: communitySlice.reducer,
        menu: menuSlice.reducer,

        /* suscripciones */
        client: clientSlice.reducer,
        closeReason: closeReasonSlice.reducer,
        contract: contractSlice.reducer,
        contractDetails: contractDetailsSlices.reducer,
        paymentTerm: paymentTermSlice.reducer,
        plans: plansSlice.reducer,
        plansDetails: plansDetailsSlice.reducer,
        services: servicesSlice.reducer,
    }
});