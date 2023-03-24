import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import CryptoJS from 'crypto-js';

import axios from 'axios';

import { login, logout } from '../store/auth/authSlice';
import { userData } from '../data/auth/userData';
import config from '../config';
import { gettingCompanies, selectCompany, setCompanies, unselectedCompany } from '../store/modules/ui/company/companyInfoSlice';
import { companyData } from '../data/ui/companyData';


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


            if (!company) return dispatch(unselectedCompany());
            dispatch(setCompanies(companyData));
            const decryptedData = CryptoJS.AES.decrypt(company, 'uva').toString(CryptoJS.enc.Utf8);
            const dataCompany = JSON.parse(decryptedData);
            dispatch(selectCompany(dataCompany));

        }

        verifyCredentials();


    }, [])

    return {
        status,
        statusCompany
    };
}
