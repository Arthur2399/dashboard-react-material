import axios from "axios"
import { checkingAccess, getModules } from "./menuSlice"
import { decryptData } from "../../../../hooks/useEncrypData";


export const startCreateMenu = () => {
    const companyInfo = localStorage.getItem("Company");
    const decryptedData = JSON.parse(decryptData(companyInfo));

    return async (dispatch, getState) => {
        const { token } = getState().auth;
        dispatch(checkingAccess())

        try {
            const { data } = await axios.get(`${config.apiUrl}/menu/asingUser/get/${decryptedData.id}`, { headers: { Authorization: token } })
            dispatch(getModules(data))
        } catch (error) {
            console.log(error)
        }
    }
}