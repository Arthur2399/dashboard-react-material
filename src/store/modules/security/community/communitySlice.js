import { createSlice } from "@reduxjs/toolkit";

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        isLoadingCommunity: true,
        comunities: [],
        active: null,
        serverMessage: null,
        errorMessage: null,
    },
    reducers: {

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
            state.activeEvent = payload;
        },

        onAddNewCommunity: (state, { payload }) => {
            state.comunities.push(payload);
            state.active = null;
        },

        onUpdateCommunity: (state, { payload }) => {
            state.comunities = state.comunities.map(community => {
                if (community.id === payload.id) {
                    return payload;
                }

                return community;
            });
        },

    }
})

export const { onLoadCommunities, onSetActiveCommunity, onAddNewCommunity, onUpdateCommunity } = communitySlice.actions;