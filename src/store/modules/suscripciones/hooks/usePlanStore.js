import { useDispatch, useSelector } from "react-redux";
import { onSetPlan } from "../slices/plansSlice";

export const usePlanStore = () => {

    const dispatch = useDispatch();
    const { isLoading, plans, active, serverMessage, errorMessage } = useSelector(state => state.plans);

    const startSetPlanDetail = (details) => {
        dispatch(onSetPlan(details))
    }

    return {
        /* ATRIBUTOS */
        isLoading,
        plans,
        active,
        serverMessage,
        errorMessage,

        /* METODOS */
        startSetPlanDetail
    }
}
