import axios from "axios";
import { getCommunities, savingChanges } from "./communitySlice";

export const startGetCompanies = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        const { currentCompany } = getState().companyInfo;
        const idCompany = currentCompany.id;
        dispatch(savingChanges());
        try {
            const { data } = await axios.get(`${config.apiUrl}/security/comunity/get/${idCompany}`,{ headers: { Authorization: token } })
            dispatch(getCommunities(data))
        } catch (error) {
            console.log(error)
        }
    }
}