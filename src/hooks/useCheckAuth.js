import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import config from "../config";
import { login, logout } from "../store/auth/authSlice";


export const useCheckAuth = () => {

    const token = window.sessionStorage.getItem("Token");
    const { status, multicompany } = useSelector(state => state.auth);
    const { status:satatusCompany } = useSelector(state => state.companyInfo);

    const dispatch = useDispatch();

    /*
        El status muestra si el usuario actual estas authenticado o no, existen tres estado en
        los reducers: "authenticated, "not-authtenticated" y "checking", este ira cambiando de 
        acuerdo la verificación del token, por ello se debe retornar para dar o denegar acceso 
        en el AppRouter.jsx


        El multicompany arroja un boolen y donde segun su estado se deber cambiar el status de 
        companyInfoSlice, con ese satus muestra o no el AfterLogin,tomar en cuenta que no debe 
        permitir avanzar al sistema si no leccionó una empresa, este dato se extrae del initialState
        de authSlice.js por defecto se encuentra en null.
    */

    useEffect(() => {

        const verifyCredentials = async () => {

            // Verificación de token

            /*
                Si no encuentra un Token en el localStore hara el llamado al reducer de logout(),
                donde borrará el localStore y seteará los datos null por default, si existe el token 
                y es válido volverá a consultar la informacion del menu y lo datos del usuario y lo enviará
                de nuevo al estado actual
            */

            if (!token) return dispatch(logout());
            const { data } = await axios.get(`${config.apiUrl}/usuarios/api-token-auth/verify`, { headers: { Authorization: token } })
            dispatch(login({...data,multicompany:false})) // El multicompany lo debe enviar el API
        }



        // Verificacion de seleccion de empresa

        /*
            Si el atributo de multicompany de authSlice es true debemos mandar AfterLogin y actualizar el
            status de companyInfoSlice en 'seleced'
        */



        /* const { data:dataMenu } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
        dispatch(getModules(dataMenu)) */
        verifyCredentials();



    }, [])

    return {status};
}
