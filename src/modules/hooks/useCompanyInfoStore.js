import { useDispatch, useSelector } from "react-redux";
import { gettingCompanies, loadingCompanies, selectCompany, unselectedCompany } from "../../store/modules/ui/company/companyInfoSlice";
import morgquickApi from "../../api/morgquickApi";

export const useCompanyInfoStore = () => {

    const { status, companies, currentCompany } = useSelector(state => state.companyInfo)
    const dispatch = useDispatch();


    const startGetCompany = async () => {
        dispatch(loadingCompanies());
        try {
            const { data } = await morgquickApi.get('/company/companyuser/company');
            dispatch(gettingCompanies(data));

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
            /* dispatch(startCreateMenu()) */

        } catch (error) {
            console.log(error)
        }
    }


    const startSelectionCompany = ({ company, fiscalExercise }) => {
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

    const startChangeCompany = () => {
        return async (dispatch) => {
            localStorage.removeItem("Company")
            dispatch(changeCompany())
        }
    }



    return {
        //Atributos
        status,
        companies,
        currentCompany,


        //Métodos
        startGetCompany,
        startSelectionCompany,
        startChangeCompany,
        //Métodos
    }
}