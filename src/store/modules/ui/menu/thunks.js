import axios from "axios"
import CryptoJS from 'crypto-js';
import { checkingAccess } from "./menuSlice"
import config from "../../../../config";


export const startCreateMenu = () => {
    const companyInfo = localStorage.getItem("Company");
    const decryptedData = CryptoJS.AES.decrypt(companyInfo, config.secretKey).toString(CryptoJS.enc.Utf8);

    console.log(JSON.parse(decryptedData));

    return async (dispatch, getState) => {
        dispatch(checkingAccess())

        /*     try {
                const { data } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
            } catch (error) {
                const { data } = error.response;
            } */
    }
}