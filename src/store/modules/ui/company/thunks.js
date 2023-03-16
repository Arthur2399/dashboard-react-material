import axios from "axios";
import { gettingCompanies, loadingCompanies, unselectedCompany } from "./companyInfoSlice";

const data = [
    {
        id: 1,
        name: "MBA",
        ruc: "9999999999", 
    },
    {
        id: 2,
        name: "Arthur&Company",
        ruc: "9999999999", 
    },
    {
        id: 3,
        name: "ERAS Soluciones",
        ruc: "9999999999", 
    }
]

/* OBJETIVO
    Este thunk cumplicará la siguientes tareas:
        1. Pedir el token de acceso al SessionStorage
        2. Realizar un petición al API para extraer la empresas.
        3. Cambiar el estado de companyInfoSlice, para alterar el acceso
           en las rutas y direccionar a After login y  que seleccione un empresa.
 */

export const startGetCompanies = () => {
    
    
    return async (dispatch, getState) => {
        //Cambia el estado a 'Loading'
        dispatch(loadingCompanies());

        //Extraer token del state de authSlice
        const { token } = getState().auth;

        //Realiza la peticción para traer la empresas - NOTA: Poner en un Try - Catch
            //const { data } = await axios.get(`${config.apiUrl}example/endpoint/companies`, { headers: { Authorization: token } })
 
        //Setear la data de empresar en companyInfoSlice 
        dispatch(gettingCompanies(data))

        //Cambiar estado a 'no-selected'
        dispatch(unselectedCompany())
    }
}