import axios from "axios";
import { gettingCompanies, loadingCompanies, onlyCompany, unselectedCompany } from "./companyInfoSlice";

const data = [
    {
        id: 1,
        name: "MBA",
        ruc: "9999999999",
        fiscal_exercise: [
            {
                id: 1,
                date: "2019"
            },
            {
                id: 2,
                date: "2020"
            },
            {
                id: 3,
                date: "2021"
            },
        ]
    },
    {
        id: 2,
        name: "Arthur&Company",
        ruc: "9999999999",
        fiscal_exercise: [
            {
                id: 1,
                date: "2021"
            },
            {
                id: 2,
                date: "2022"
            },

        ]
    },
    {
        id: 3,
        name: "ERAS Soluciones",
        ruc: "9999999999",
        fiscal_exercise: [
            {
                id: 1,
                date: "2021"
            },
            {
                id: 2,
                date: "2022"
            },
            {
                id: 3,
                date: "2023"
            }
        ]
    }
]

const dataOnly = {
        id: 1,
        name: "MBA",
        ruc: "9999999999",
        fiscal_exercise: [
            {
                id: 1,
                date: "2019"
            },
            {
                id: 2,
                date: "2020"
            },
            {
                id: 3,
                date: "2021"
            },
        ]
    }

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

        //Realiza la peticción para traer la empresas - NOTA: Poner en un Try - Catch
        //const { data } = await axios.get(`${config.apiUrl}example/endpoint/companies`, { headers: { Authorization: token } })

        //Setear la data de empresar en companyInfoSlice 
        dispatch(gettingCompanies(data))

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

        //Setear la data de empresa en companyInfoSlice 
        dispatch(onlyCompany(dataOnly))

    }
}