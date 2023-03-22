import axios from "axios"
import { useSelector } from "react-redux"
import { checkingAccess } from "./menuSlice"


export const startCreateMenu = ({token}) => {
    return async (dispatch) => {
        dispatch(checkingAccess())
    /*     try {
            const { data } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
        } catch (error) {
            const { data } = error.response;
        } */
    }
}