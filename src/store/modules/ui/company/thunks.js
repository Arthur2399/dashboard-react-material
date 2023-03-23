import axios from "axios";
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
        if (companyData.length > 1) return dispatch(unselectedCompany());

        const { fiscal_exercise, ...newCompanyData } = companyData[0];

        dispatch(selectCompany({ ...newCompanyData, fiscal_exercise: fiscal_exercise[0] }));
    }
}

export const startSelectionCompany = ({ id_company, id_fiscal_exercise }) => {
    return async (dispatch) => {

        let onlyCompany = companyData.find(obj => obj.id === id_company)
        const selectFiscalExercise = onlyCompany.fiscal_exercise.find(obj => obj.id === id_fiscal_exercise)

        const { fiscal_exercise, ...newOnlyCompany } = onlyCompany; // crear una copia de onlyCompany sin la propiedad fiscal_exercise

        const selectedCompany = { ...newOnlyCompany, fiscal_exercise: selectFiscalExercise }; // imprimir la nueva copia del objeto con la propiedad actualizada

        dispatch(selectCompany(selectedCompany))
    }
}