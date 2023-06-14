import { useSelector } from "react-redux"
import { decryptData } from "../../../../hooks";
import {
    onAddNewContract,
    onClearMessageContract,
    onIsLoadingContracts,
    onLoadContract,
    onSendErrorMessageContract,
    onSendServerErrorMessageContract,
    onSetActiveContract,
    onUpdateContract
} from "../slices";

export const useContractStore = () => {
    const { isLoading, contract, active, serverMessage, errorMessage } = useSelector(state => state.contract);


    const startLoadingContracts = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoadingContracts())
        try {
            const { data } = await morgquickApi.get(`/plans/PlansHeader/get/${decryptedData.id}`);
            dispatch(onLoadContract(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingContract = async (data) => {

        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...data, company_id: decryptedData.id }

        dispatch(onIsLoadingContracts())
        try {
            if (data.id) {
                // Actualizando
                await morgquickApi.put(`/plans/PlansHeader/update/${data.id}`, values);
                dispatch(onUpdateContract(values));
                navigate('/suscripciones/configuracion/planes');
                return;
            }
            // Creando
            const { data } = await morgquickApi.post('/plans/PlansHeader/post', { ...values, state: 1 });
            dispatch(onAddNewContract(values));
            /* startSetHeaderPlan(data) */
            navigate('/suscripciones/configuracion/planes/detalle');

        } catch (error) {
            if (error.response.status == 400) {
                var claves = Object.keys(error.response.data);
                var firstValue = error.response.data[claves[0]];
                dispatch(onSendErrorMessageContract(firstValue[0]))
            } else {
                dispatch(onSendServerErrorMessageContract(error.response.data.error))
            }
        }
    }

    const startSetActiveContract = (plan) => {
        dispatch(onSetActiveContract(plan));
    }

    const startClearMessageContract = () => {
        dispatch(onClearMessageContract())
    }

    return {
        /* Atributos */
        isLoading,
        contract,
        active,
        serverMessage,
        errorMessage,

        /* Metodos */
        startLoadingContracts,
        startSavingContract,
        startSetActiveContract,
        startClearMessageContract,
    }
}
