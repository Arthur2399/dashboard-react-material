import axios from "axios";
import config from "../../../../config";
import { savingChanges } from "./communitySlice";

export const startGetCompanies = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        const { currentCompany } = getState().companyInfo;
        const idCompany = currentCompany.id;
        dispatch(savingChanges());
        try {
            const { data } = await axios.get(`${config.apiUrl}/security/comunity/get/${idCompany}`,{ headers: { Authorization: token } })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}