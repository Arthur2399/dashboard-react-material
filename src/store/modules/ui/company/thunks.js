import axios from "axios";
import { changeCompany, gettingCompanies, loadingCompanies, selectCompany, unselectedCompany } from "./companyInfoSlice";
import { startCreateMenu } from "../menu/thunks";
import config from "../../../../config";
import { encrypData } from "../../../../hooks/useEncrypData";



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
        try {
            const { data } = await axios.get(`${config.apiUrl}/company/companyuser/company`, { headers: { Authorization: token } })
            dispatch(gettingCompanies(data));

            //Validación seleccion de empresa
            /* NOTA
                Si el valor de la peticion tiene un listas de objetos superior a uno hara el despacho de
                unselectedComany() que cambiará el estado a 'no-selected' por el contrario si es menor a 1
                despachará selectCompany() cambiando el estado a selected.
            */
            if (data.length > 1) return dispatch(unselectedCompany());

            //Desfracmetación y aislamiento del atributo fiscal_exercise
            const { fiscal_exercise, ...newData } = data[0];

            //Reconstrucción del objeto con el valor de fiscal_exercise en la posición [0]
            const companySelected = { ...newData, fiscal_exercise: fiscal_exercise[0] }

            //Encriptación de la información
            const encryptedData = encrypData(companySelected);

            //Guardar la información de la empresa seleccionada en el localStorage del navegador
            localStorage.setItem("Company", encryptedData);

            //Seteo de la informacion en state currentCompany de companyInfoSlice.js
            dispatch(selectCompany(companySelected));

            //Crear menu
            dispatch(startCreateMenu())

        } catch (error) {
            console.log(error)
        }
    }
}

export const startSelectionCompany = ({ company, fiscalExercise }) => {
    return async (dispatch, getState) => {
        const { companies } = getState().companyInfo;

        /* NOTA
            De acuerdo a la selección del usuario en el AfterLogin.jsx se hara una búsqueda
            por id las empresa y ejercicio fiscal, luego se guardará esa informacion en el 
            currentCompany del companyInfoSlice y en el LocalStorge del navegador.
        */

        //Busqueda por id entre la lista de empresas
        let onlyCompany = companies.find(obj => obj.id === company)

        //Busqueda por id entre la lista de ejercicio fiscal de la empresa.
        const selectFiscalExercise = onlyCompany?.fiscal_exercise.find(obj => obj.value === fiscalExercise)

        //Aislamiento del atributo fiscal_exercise
        const { fiscal_exercise, ...newOnlyCompany } = onlyCompany;

        //Construcción del objeto remplazando las lista de fiscal_exercise por el valor seleccionado
        const selectedCompany = { ...newOnlyCompany, fiscal_exercise: selectFiscalExercise };

        //Encriptación de la información
        const encryptedData = encrypData(selectedCompany);

        //Guardar la información de la empresa seleccionada en el localStorage del navegador
        localStorage.setItem("Company", encryptedData);

        //Seteo de la informacion en state currentCompany de companyInfoSlice.js
        dispatch(selectCompany(selectedCompany))

        //Crear menu
        dispatch(startCreateMenu())
    }
}

export const startChangeCompany = () => {
    return async (dispatch) => {
        localStorage.removeItem("Company")
        dispatch(changeCompany())
    }
}