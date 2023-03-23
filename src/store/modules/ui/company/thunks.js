import axios from "axios";
import { companiesData } from "../../../../data/ui/companyData";
import { gettingCompanies, loadingCompanies, onlyCompany, unselectedCompany } from "./companyInfoSlice";



/* OBJETIVO
    Este thunk cumplicará la siguientes tareas:
        1. Pedir el token de acceso al SessionStorage
        2. Realizar un petición al API para extraer la empresas.
        3. Cambiar el estado de companyInfoSlice, para alterar el acceso
           en las rutas y direccionar a After login y  que seleccione un empresa.
 */

export const startGetMultiCompanies = () => {

    return async (dispatch, getState) => {
        //Cambia el estado a 'Loading'
        dispatch(loadingCompanies());

        //Extraer token del state de authSlice
        const { token } = getState().auth;

        //TODO Realiza la peticción para traer la empresas - NOTA: Poner en un Try - Catch
            //const { data } = await axios.get(`${config.apiUrl}example/endpoint/companies`, { headers: { Authorization: token } })

        //Setear la data de empresar en companyInfoSlice 
        dispatch(gettingCompanies(companiesData))

        //Cambiar estado a 'no-selected'
        dispatch(unselectedCompany())
    }
}


export const startGetCompany = () => {

    return async (dispatch, getState) => {
        //Cambia el estado a 'Loading'
        dispatch(loadingCompanies());

        //Extraer token del state de authSlice
        const { token } = getState().auth;

        //Realiza la peticción para traer la empresa - NOTA: Poner en un Try - Catch
        //const { data } = await axios.get(`${config.apiUrl}example/endpoint/companies`, { headers: { Authorization: token } })

        localStorage.setItem("companyData",JSON.stringify(dataOnly));
        //Setear la data de empresa en companyInfoSlice 
        dispatch(onlyCompany(dataOnly))

    }
}