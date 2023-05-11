import { createSlice } from '@reduxjs/toolkit';

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        isSaving: false,
        messageSaved: '',
        communities: [],
        active: null,
        /*      "province_id": 17,
                "city_id": 181,
                "name_community": "Santa Ana",
                "address": "Ricardo Jaramillo y Salomón Cardenas",
                "company_id":1,
                "low_message":"",
                "med_message":"",
                "high_message":"" */
    },
    reducers: {
        savingNewCommunity: (state) => {
            state.isSaving = true;
        },
        addNewEmptyCommunity: (state, action) => {
            state.communities.push(action.payload);
            state.isSaving = false;
        },
        setActiveCommunity: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setcommunities: (state, action) => {
            state.communities = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateCommunity: (state, action) => { // payload: note
            state.isSaving = false;
            state.communities = state.communities.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },

        deleteCommunityById: (state, action) => {
            state.active = null;
            state.communities = state.communities.filter(note => note.id !== action.payload);
        },
        
        clearcommunitiesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.communities = [];
            state.active = null;
        },

    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyCommunity,
    clearcommunitiesLogout,
    deleteCommunityById,
    savingNewCommunity,
    setActiveCommunity,
    setcommunities,
    setPhotosToActiveCommunity,
    setSaving,
    updateCommunity,
} = communitySlice.actions;