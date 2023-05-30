import { useDispatch, useSelector } from "react-redux";
import { onSetPlan } from "../slices/plansSlice";

export const usePlanStore = () => {

    const dispatch = useDispatch();
    const { isLoading, comunities, active, serverMessage, errorMessage } = useSelector(state => state.plans);

    const startSetPlanDetail = (details) => {
        dispatch(onSetPlan(details))
    }

    return {
        /* ATRIBUTOS */
        isLoading,
        comunities,
        active,
        serverMessage,
        errorMessage,

        /* METODOS */
        startSetPlanDetail
    }
}
