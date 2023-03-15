import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import config from "../config";
import { login, logout } from "../store/auth/authSlice";
import { getModules } from "../store/ui/menu/menuSlice";


export const useCheckAuth = () => {
    const token = window.sessionStorage.getItem("Token");
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();



    useEffect(() => {

        const verifyCredentials = async () => {
            if(!token) return dispatch(logout());
            const { data } = await axios.get(`${config.apiUrl}/usuarios/api-token-auth/verify`,{headers: {Authorization: token}})
            const { data:dataMenu } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
            dispatch(getModules(dataMenu))
            dispatch(login(data))
        }
        verifyCredentials();
    }, [])

    return status;
}
