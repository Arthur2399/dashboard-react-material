import { createSlice } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        isLoadingCommunity: false,
        comunities: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {

        onIsLoading: (state)=>{
            state.isLoadingCommunity=true;
        },

        onLoadCommunities: (state, { payload = [] }) => {
            state.isLoadingCommunity = false;
            payload.forEach(community => {
                const exists = state.comunities.some(dbCommunity => dbCommunity.id === community.id);
                if (!exists) {
                    state.comunities.push(community)
                }
            })
        },

        onSetActiveCommunity: (state, { payload }) => {
            state.active = payload;
        },

        onAddNewCommunity: (state, { payload }) => {
            state.isLoadingCommunity= false;
            state.comunities.push(payload);
            state.active = null;
        },

        onUpdateCommunity: (state, { payload }) => {
            state.isLoadingCommunity= false;
            state.comunities = state.comunities.map(community => {
                if (community.id === payload.id) {
                    return payload;
                }

                return community;
            });
        },

    }
})

export const { onLoadCommunities, onSetActiveCommunity, onAddNewCommunity, onUpdateCommunity,onIsLoading } = communitySlice.actions;