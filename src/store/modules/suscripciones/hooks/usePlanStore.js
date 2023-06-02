import { useDispatch, useSelector } from "react-redux";
import morgquickApi from "../../../../api/morgquickApi";
import { decryptData } from "../../../../hooks/useEncrypData";
import { clearMessage, onAddNewPlan, onIsLoading, onLoadPlans, onSetActivePlan, onUpdatePlan, sendErrorMessage, sendServerErrorMessage } from "../slices/plansSlice";
import { useNavigate } from "react-router-dom";
import { usePlanDetailsStore } from "./usePlanDetailsStore";

export const usePlanStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, plans, active, serverMessage, errorMessage } = useSelector(state => state.plans);
    const { startSetHeaderPlan } = usePlanDetailsStore();


    const startonLoadingPlans = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())

        try {
            const { data } = await morgquickApi.get(`/plans/PlansHeader/get/${decryptedData.id}`);
            dispatch(onLoadPlans(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSavingPlan = async (planData) => {

        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...planData, company_id: decryptedData.id }

        dispatch(onIsLoading())
        try {
            if (planData.id) {
                // Actualizando
                await morgquickApi.put(`/plans/PlansHeader/update/${planData.id}`, values);
                dispatch(onUpdatePlan(values));
                navigate('/suscripciones/configuracion/planes');
                return;
            }
            // Creando
            const { data } = await morgquickApi.post('/plans/PlansHeader/post', { ...values, state: 1 });
            dispatch(onAddNewPlan(values));
            startSetHeaderPlan(data)
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


    const startSetActivePlan = (plan) => {
        dispatch(onSetActivePlan(plan));
    }

    const startClearMessage = () => {
        dispatch(clearMessage())
    }

    return {
        /* ATRIBUTOS */
        isLoading,
        plans,
        active,
        serverMessage,
        errorMessage,

        /* METODOS */
        startonLoadingPlans,
        startSetActivePlan,
        startSavingPlan,
        startClearMessage,
    }
}
