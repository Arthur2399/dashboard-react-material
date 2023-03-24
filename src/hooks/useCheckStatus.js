import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import CryptoJS from 'crypto-js';


import { login, logout } from '../store/auth/authSlice';
import { userData } from '../data/auth/userData';
import { companyData } from '../data/ui/companyData';
import { selectCompany, setCompanies, unselectedCompany } from '../store/modules/ui/company/companyInfoSlice';
import config from '../config';


export const useCheckStatus = () => {

    const token = sessionStorage.getItem("Token");
    const company = localStorage.getItem("Company");

    //UseSelector extrae datos del Store de la aplicación
    const { status } = useSelector(state => state.auth);
    const { status: statusCompany } = useSelector(state => state.companyInfo);

    const dispatch = useDispatch();

    /* OBJETIVO
        Este hook debe retornar el estado del authSlice y compoanyInfoSlice realizando:
            1. Verificar si existe el token autentificación en el localStorage y guardarlo.
            2. Realizar un petición al API y verificar si dicho token es valido.
            3. Si es válido volver enviar los datos del usuario a authSlice rectificando el estado 'authenticated'
            4. Si el token no es válido llama el reducer logout() borrando datos del sessionStorage.
            5. Verificar si existe hash de encriptación de empresa
            6. Pedir que seleccione empresa en caso de no existir
            7. Volver a guardar empresa seleccionada en localStorage encryptado
    */

    useEffect(() => {

        const verifyCredentials = async () => {

            /* NOTA
                Si no encuentra un Token en el localStore hara el llamado al reducer de logout(),
                donde borrará el localStore y seteará los datos null por default, si existe el token 
                y es válido volverá a consultar la informacion del menu y lo datos del usuario y lo enviará
                de nuevo al estado actual
            */
            if (!token) return dispatch(logout());
            //TODO El multicompany lo debe enviar el API
                /* const { data } = await axios.get(`${config.apiUrl}/usuarios/api-token-auth/verify`, { headers: { Authorization: token } })
                dispatch(login({ ...data, multicompany: true })) */
            dispatch(login(userData))


            /* Nota
                En caso de no existir compania en el localStorage debe hacer despacho del metodo 
                unSelectedCompany para selecciones un empresa, caso contrario de volvera a enviar 
                la información registrada.
            */


            // Valida si existe company en localStorage
            if (!company) return dispatch(unselectedCompany());

            // Setear de nuevo todas las companias
            //TODO Esto debe enviarse desde el API 
            dispatch(setCompanies(companyData));

            // Desecripta la informacion de compania
            const decryptedData = CryptoJS.AES.decrypt(company, 'uva').toString(CryptoJS.enc.Utf8);

            // Transforma en JSON
            const dataCompany = JSON.parse(decryptedData);

            // Setea la informacion como empresa seleccionada
            dispatch(selectCompany(dataCompany));

        }
        verifyCredentials();

    }, [])

    return {
        status,
        statusCompany
    };
}
