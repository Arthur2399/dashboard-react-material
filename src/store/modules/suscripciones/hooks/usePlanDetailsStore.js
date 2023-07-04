import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, onAddNewPlanDetails, onIsLoading, onLoadPlansDetails, onSetActivePlanDetails, onSetHeaderPlan, onUpdatePlanDetails, sendErrorMessage, sendServerErrorMessage } from "../slices/plansDetailsSlice";
import 
{ morgquickApi } from "../../../../api/morgquickApi";
import { encrypData } from "../../../../hooks/useEncrypData";
import { decryptData } from "../../../../hooks/useEncrypData";

export const usePlanDetailsStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, headerPlan, details, active, serverMessage, errorMessage } = useSelector(state => state.plansDetails);

    const startSetHeaderPlan = (headerPlan) => {
        const encryptedData = encrypData(headerPlan);
        localStorage.setItem("HeaderPlan", encryptedData);
        dispatch(onSetHeaderPlan(headerPlan));
    }

    const startonLoadingPlansDetails = async () => {

        dispatch(onIsLoading())
        let idHeader = headerPlan?.id

        if (headerPlan == null) {
            let HeaderDescrip = JSON.parse(decryptData(localStorage.getItem("HeaderPlan")));
            dispatch(onSetHeaderPlan(HeaderDescrip));
            idHeader = HeaderDescrip.id
        }

        try {
            const { data } = await morgquickApi.get(`/plans/PlansDetail/get/${idHeader}`);
            dispatch(onLoadPlansDetails(data))
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

    const startClearMessage = () => {
        dispatch(clearMessage())
    }
    return {
        /* ATRIBUTOS */
        isLoading,
        headerPlan,
        details,
        active,
        serverMessage,
        errorMessage,

        /* METODOS */
        startSetHeaderPlan,
        startSetActivePlanDetails,
        startSavingPlanDetail,
        startonLoadingPlansDetails,
        startClearMessage,
    }
}
