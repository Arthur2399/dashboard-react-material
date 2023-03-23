import axios from "axios";
import CryptoJS from 'crypto-js';
import { companyData } from "../../../../data/ui/companyData";
import { gettingCompanies, loadingCompanies, selectCompany, unselectedCompany } from "./companyInfoSlice";



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

        //TODO Realiza la peticción para traer la empresa - NOTA: Poner en un Try - Catch
            //const { data } = await axios.get(`${config.apiUrl}example/endpoint/companies`, { headers: { Authorization: token } })
        dispatch(gettingCompanies(companyData));

        //Validación seleccion de empresa

        /* NOTA
            Si el valor de la peticion tiene un listas de objetos superior a uno hara el despacho de
            unselectedComany() que cambiará el estado a 'no-selected' por el contrario si es menor a 1
            despachará selectCompany() cambiando el estado a selected.
        
        */
        if (companyData.length > 1) return dispatch(unselectedCompany());

        //Desfracmetación y aislamiento del atributo fiscal_exercise
        const { fiscal_exercise, ...newCompanyData } = companyData[0];

        //Reconstrucción del objeto con el valor de fiscal_exercise en la posición [0]
        const companySelected = { ...newCompanyData, fiscal_exercise: fiscal_exercise[0] }

        //Encriptación de la información
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(companySelected), 'uva').toString();

        //Guardar la información de la empresa seleccionada en el localStorage del navegador
        localStorage.setItem("Company", encryptedData);

        //Seteo de la informacion en state currentCompany de companyInfoSlice.js
        dispatch(selectCompany(companySelected));
    }
}

export const startSelectionCompany = ({ id_company, id_fiscal_exercise }) => {
    return async (dispatch) => {

        /* NOTA
            De acuerdo a la selección del usuario en el AfterLogin.jsx se hara una búsqueda
            por id las empresa y ejercicio fiscal, luego se guardará esa informacion en el 
            currentCompany del companyInfoSlice y en el LocalStorge del navegador.
        */

        //Busqueda por id entre la lista de empresas
        let onlyCompany = companyData.find(obj => obj.id === id_company)

        //Busqueda por id entre la lista de ejercicio fiscal de la empresa.
        const selectFiscalExercise = onlyCompany.fiscal_exercise.find(obj => obj.id === id_fiscal_exercise)

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