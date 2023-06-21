import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { decryptData } from "../../../../hooks";
import { morgquickApi } from "../../../../api";
import {
    onAddNewContract,
    onClearMessageContract,
    onIsLoadingContracts,
    onLoadContract,
    onSendErrorMessageContract,
    onSendServerErrorMessageContract,
    onSetActiveContract,
    onUpdateContract,
} from "../slices";

export const useContractStore = () => {

    const { isLoading, contract, active, serverMessage, errorMessage } = useSelector(state => state.contract);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startLoadContracts = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoadingContracts())
        try {
            const { data } = await morgquickApi.get(`/subscriptions/Contracts/Header/get/${decryptedData.id}`);
            dispatch(onLoadContract(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingContract = async (contractData) => {

        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...contractData, company_id: decryptedData.id }

        dispatch(onIsLoadingContracts());
        try {
            if (contractData.id) {
                // Actualizando
                await morgquickApi.put(`/plans/PlansHeader/update/${contractData.id}`, values);
                dispatch(onUpdateContract(values));
                navigate('/suscripciones/contratos/');
                return;
            }
            // Creando
            const { data } = await morgquickApi.post('/subscriptions/Contracts/Header/post', values);
            dispatch(onAddNewContract(values));
            navigate('/suscripciones/contratos/');
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
        startLoadContracts,
        startSavingContract,
        startSetActiveContract,
        startClearMessageContract,
    }
}
