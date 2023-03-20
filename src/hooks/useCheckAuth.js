import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import config from "../config";
import { login, logout } from "../store/auth/authSlice";


export const useCheckAuth = () => {

    const token = sessionStorage.getItem("Token");
    const { status } = useSelector(state => state.auth);
    const { status: statusCompany } = useSelector(state => state.companyInfo);

    const dispatch = useDispatch();

    /* OBJETIVO
        Este hook debe retornar el estado del authSlice y compoanyInfoSlice realizando:
            1. Verificar si existe el token autentificación en el localStorage y guardarlo.
            2. Realizar un petición al API y verificar si dicho token es valido.
            3. Si es válido volver enviar los datos del usuario a authSlice rectificando el estado 'authenticated'
            4. Si el token no es válido llama el reducer logout() borrando datos del sessionStorage.

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
            dispatch(login({ ...data, multicompany: true })) // El multicompany lo debe enviar el API
        }
        
        verifyCredentials();


        // Verificacion de seleccion de empresa

        /*
            Si el atributo de multicompany de authSlice es true debemos mandar AfterLogin y actualizar el
            status de companyInfoSlice en 'seleced'
        */



        /* const { data:dataMenu } = await axios.get(`${config.apiUrl}/menu/asignacion/user`, {headers: {Authorization: token}})
        dispatch(getModules(dataMenu)) */



    }, [])

    return {
        status,
        statusCompany
    };
}
