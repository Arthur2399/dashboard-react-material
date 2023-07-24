import { createSlice } from "@reduxjs/toolkit";

export const accountingPlanSlice = createSlice({
    name: 'accountingPlan',
    initialState: {
        isLoading: false,
        active: null,
        accountingPlans: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoadingAccountingPlan: (state) => {
            state.isLoading = true;
        },
        onSetActiveAccountingPlan: (state, { payload }) => {
            state.active = payload;
        },
        onLoadAccountingPlan: (state, { payload = [] }) => {
            state.isLoading = false;
            state.accountingPlans = payload
        },
        onAddNewAccountingPlan: (state, { payload }) => {
            if (payload.id === 0) return;
            state.accountingPlans.push(payload);
            state.active = null;
        },
        onUpdateAccountingPlan: (state, { payload }) => {
            state.accountingPlans = state.accountingPlans.map(accountingPlan => {
                if (accountingPlan.id === payload.id) {
                    return payload;
                }
                return accountingPlan;
            });
        },
        onConfirmDeleteAccountingPlan: (state,) => {
            state.confirm = true
        },
        onSendErrorMessageAccountingPlan: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        onSendServerErrorMessageAccountingPlan: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        onClearMessageAccountingPlan: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})
export const {
onIsLoadingAccountingPlan,
onSetActiveAccountingPlan,
onLoadAccountingPlan,
onAddNewAccountingPlan,
onUpdateAccountingPlan,
onConfirmDeleteAccountingPlan,
onSendErrorMessageAccountingPlan,
onSendServerErrorMessageAccountingPlan,
onClearMessageAccountingPlan,
} = accountingPlanSlice.actions;
