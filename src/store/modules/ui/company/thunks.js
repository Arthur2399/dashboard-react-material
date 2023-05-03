import axios from "axios";
import CryptoJS from 'crypto-js';
import { changeCompany, gettingCompanies, loadingCompanies, selectCompany, unselectedCompany } from "./companyInfoSlice";
import config from "../../../../config";



/* OBJETIVO
    Este thunk cumplicará la siguientes tareas:
        1. Pedir el token de acceso al SessionStorage
        2. Realizar un petición al API para extraer la empresas.
        3. Cambiar el estado de companyInfoSlice, para alterar el acceso
           en las rutas y direccionar a After login y  que seleccione un empresa.
 */

export const startGetCompany = () => {

    return async (dispatch, getState) => {
        //Cambia el estado a 'Loading'
        dispatch(loadingCompanies());

        //Extraer token del state de authSlice
        const { token } = getState().auth;

        console.log(token)
        try {
            const { data } = await axios.get(`${config.apiUrl}/company/companyuser/company`, { headers: { Authorization: token } })
            console.log(data)
            dispatch(gettingCompanies(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export const startSelectionCompany = ({ company, fiscalExercise }) => {
    return async (dispatch) => {

        /* NOTA
            De acuerdo a la selección del usuario en el AfterLogin.jsx se hara una búsqueda
            por id las empresa y ejercicio fiscal, luego se guardará esa informacion en el 
            currentCompany del companyInfoSlice y en el LocalStorge del navegador.
        */

        //Busqueda por id entre la lista de empresas
        let onlyCompany = companyData.find(obj => obj.id === company)

        //Busqueda por id entre la lista de ejercicio fiscal de la empresa.
        const selectFiscalExercise = onlyCompany?.fiscal_exercise.find(obj => obj.id === fiscalExercise)

        //Aislamiento del atributo fiscal_exercise
        const { fiscal_exercise, ...newOnlyCompany } = onlyCompany;

        //Construcción del objeto remplazando las lista de fiscal_exercise por el valor seleccionado
        const selectedCompany = { ...newOnlyCompany, fiscal_exercise: selectFiscalExercise };

        //Encriptación de la información
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(selectedCompany), 'uva').toString();

        //Guardar la información de la empresa seleccionada en el localStorage del navegador
        localStorage.setItem("Company", encryptedData);

        //Seteo de la informacion en state currentCompany de companyInfoSlice.js
        dispatch(selectCompany(selectedCompany))
    }
}

export const startChangeCompany = () => {
    return async (dispatch) => {
        localStorage.removeItem("Company")
        dispatch(changeCompany())
    }
}