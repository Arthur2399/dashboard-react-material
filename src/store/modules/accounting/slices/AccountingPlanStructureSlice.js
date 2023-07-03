export const pedroSlice = createSlice({
    name: 'pedro',
    initialState: {
        isLoading: false,
        active: null,
        pedros: [],
        confirm: false,
        errorMessage: null,
        serverMessage: null,
    },
    reducers: {
        onIsLoadingPedro: (state) => {
            state.isLoading = true;
        },
        onSetActivePedro: (state, { payload }) => {
            state.active = payload;
        },
        onLoadPedro: (state, { payload = [] }) => {
            state.isLoading = false;
            state.pedros = payload
        },
        onAddNewPedro: (state, { payload }) => {
            if (payload.id === 0) return;
            state.pedros.push(payload);
            state.active = null;
        },
        onUpdatePedro: (state, { payload }) => {
            state.pedros = state.pedros.map(pedro => {
                if (pedro.id === payload.id) {
                    return payload;
                }
                return pedro;
            });
        },
        onConfirmDeletePedro: (state,) => {
            state.confirm = true
        },
        sendErrorMessagePedro: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
        sendServerErrorMessagePedro: (state, { payload }) => {
            state.isLoading = false;
            state.serverMessage = payload;
        },
        clearMessagePedro: (state) => {
            state.errorMessage = null;
            state.serverMessage = null;
            state.confirm = false;
        }
    }
})
export const {
} = pedroSlice.actions;