export const startGetCompanies = () => {
    return async (dispatch) => {
        dispatch(LoadingCompanies  ());
    }

}