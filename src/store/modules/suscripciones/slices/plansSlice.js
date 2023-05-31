import { createSlice } from "@reduxjs/toolkit";

export const plansSlice = createSlice({
    name: 'plans',
    initialState: {
        isLoading: false,
        plans: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {
        onIsLoading: (state) => {
            state.isLoading = true;
        },

        onSetActivePlan: (state, { payload }) => {
            state.active = payload;
        },
        onLoadPlans: (state, { payload = [] }) => {
            state.isLoading = false;
            payload.forEach(plan => {
                const exists = state.plans.some(dbPlan => dbPlan.id === plan.id);
                if (!exists) {
                    state.plans.push(plan)
                }
            })
        },
        onAddNewPlan: (state, { payload }) => {
            if (payload.id === 0) return;
            state.plans.push(payload);
            state.active = null;
        },

        onUpdatePlan: (state, { payload }) => {
            state.plans = state.plans.map(plan => {
                if (plan.id === payload.id) {
                    return payload;
                }
                return plan;
            });
        },

        onConfirmDelete: (state,) => {
            state.confirm = true
        },
        sendErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        sendServerErrorMessage: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        clearMessage: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})

export const {
    onIsLoading,
    onSetActivePlan,
    onLoadPlans,
    onAddNewPlan,
    onUpdatePlan,
    onConfirmDelete,
    sendErrorMessage,
    sendServerErrorMessage,
    clearMessage,
} = plansSlice.actions;