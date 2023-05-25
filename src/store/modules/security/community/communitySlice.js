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
            payload.forEach( community => {
                const exists = state.comunities.some( dbCommunity => dbCommunity.id === community.id );
                if ( !exists ) {
                    state.comunities.push( community )
                }
            })
        },        



    }
})

export const { onLoadCommunities} = communitySlice.actions;