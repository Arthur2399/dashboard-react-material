import axios from "axios"
import { useSelector } from "react-redux"
import { checkingAccess } from "./menuSlice"


export const startCreateMenu = ({token}) => {
    return async (dispatch) => {
        console.log(token)
        dispatch(checkingAccess())
    /*     try {
            const { data } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
            return console.log("Si llego")
        } catch (error) {
            const { data } = error.response;
            console.log("No llego")
        } */
    }
}