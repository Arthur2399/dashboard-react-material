import { useDispatch, useSelector } from "react-redux";
import morgquickApi from "../../api/morgquickApi";
import { decryptData, encrypData } from "../../hooks/useEncrypData";
import { changeCompany, gettingCompanies, loadingCompanies, selectCompany, setCompanies, unselectedCompany } from "../../store/modules/ui/company/companyInfoSlice";
import { useMenuStore } from "./useMenuStore";

export const useCompanyInfoStore = () => {

    const { status, companies, currentCompany } = useSelector(state => state.companyInfo)
    const { startCreateMenu } = useMenuStore();
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
            startCreateMenu();

        } catch (error) {
            console.log(error)
        }
    }


    const startSelectionCompany = ({ company, fiscalExercise }) => {

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

    const checkingCompany = async () => {
        const company = localStorage.getItem("Company");
        try {
            const { data } = await morgquickApi.get(`/company/companyuser/company`)

            if (!company) return dispatch(gettingCompanies(data));

            dispatch(setCompanies(data));

            // Desecripta la informacion de compania
            const decryptedData = decryptData(company);

            // Transforma en JSON
            const dataCompany = JSON.parse(decryptedData);

            // Peticion del Menu
/*             const { data:menuData } = await morgquickApi.get(`${config.apiUrl}/menu/asingUser/get/${dataCompany.id}`, { headers: { Authorization: token } })
            dispatch(getModules(menuData)) */

            // Setea la informacion como empresa seleccionada
            dispatch(selectCompany(dataCompany));
        } catch (error) {
            console.log(error)
        }
    }

    const startChangeCompany = () => {
        localStorage.removeItem("Company")
        dispatch(changeCompany())
    }



    return {
        //Atributos
        status,
        companies,
        currentCompany,
        //Métodos
        startGetCompany,
        checkingCompany,
        startSelectionCompany,
        startChangeCompany,
    }
}