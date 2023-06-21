import { useDispatch } from "react-redux";
import { useStore } from "react-redux/es"
import { useNavigate } from "react-router";
import { onIsLoadingDetailsContract, onLoadDetailsContract, onSetHeaderContract } from "../slices/contractDetailsSlice";
import { encrypData } from "../../../../hooks/useEncrypData";

export const useContractDetailsStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, headerContract, details, active, serverMessage, errorMessage } = useStore(state => state.contractDetails)

    const startSetHeaderContract = (headerContract) => {
        const encryptedData = encrypData(headerContract);
        localStorage.setItem("HeaderContract", encryptedData);
        dispatch(onSetHeaderContract(headerPlan));
    }

    
    const startLoadContractDetails = async () => {

        dispatch(onIsLoadingDetailsContract())
        let idHeader = headerContract?.id

        if (headerContract == null) {
            let HeaderContractDecrip = JSON.parse(decryptData(localStorage.getItem("HeaderContract")));
            dispatch(onSetHeaderPlan(HeaderContractDecrip));
            idHeader = HeaderContractDecrip.id
        }

        try {
            const { data } = await morgquickApi.get(`/subscriptions/Contracts/Detail/get/${idHeader}`);
            dispatch(onLoadDetailsContract(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSetActivePlanDetails = (planDetails) => {
        dispatch(onSetActivePlanDetails(planDetails));
    }

    const startSavingPlanDetail = async (planData) => {
        dispatch(onIsLoading())
        try {
            if (planData.id) {
                // Actualizando
                await morgquickApi.put(`/plans/PlansDetail/update/${planData.id}`, { ...planData, plan_header_id: headerPlan.id });
                dispatch(onUpdatePlanDetails(planData));
                navigate('/suscripciones/configuracion/planes/detalle');
                return;
            }
            // Creando
            await morgquickApi.post('/plans/PlansDetail/post', { ...planData, plan_header_id: headerPlan.id });
            dispatch(onAddNewPlanDetails(planData));
            navigate('/suscripciones/configuracion/planes/detalle');
        } catch (error) {
            if (error.response.status == 400) {
                var claves = Object.keys(error.response.data);
                var firstValue = error.response.data[claves[0]];
                dispatch(sendErrorMessage(firstValue[0]))
            } else {
                dispatch(sendServerErrorMessage(error.response.data.error))
            }
        }
    }



    return {
        /* Atributos */
        isLoading,
        headerContract,
        details,
        active,
        serverMessage,
        errorMessage,

        /* Metodos */
        startLoadContractDetails,
        startSetHeaderContract,

    }
}
