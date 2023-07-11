import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAddNewReason, onClearMessage, onIsLoading, onLoadreasons, onSendErrorMessage, onSendServerErrorMessage, onSetActiveReason, onUpdateReason } from "../slices/closeReasonSlice";
import { decryptData } from "../../../../hooks/useEncrypData";
import { morgquickApi } from "../../../../api/morgquickApi";

export const useClosingReasonStore = () => {
    const { isLoading, reasons, active, serverMessage, errorMessage, confirm } = useSelector(state => state.closeReason)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startonLoadingReasons = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())
        try {
            const { data } = await morgquickApi.get(`/tables/ClosingReason/get/${decryptedData.id}`);
            dispatch(onLoadreasons(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSetActiveReason = (client) => {
        dispatch(onSetActiveReason(client));
    }

    const startSavingReason = async (reasonData) => {

        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...reasonData, company_id: decryptedData.id }

        dispatch(onIsLoading())
        try {
            if (reasonData.id) {
                // Actualizando
                await morgquickApi.put(`/tables/ClosingReason/update/${reasonData.id}`, values);
                dispatch(onUpdateReason(values));
                navigate('/suscripciones/configuracion/razoncierre');
                return;
            }
            // Creando
            await morgquickApi.post('tables/ClosingReason/post', values);
            dispatch(onAddNewReason(values));
            navigate('/suscripciones/configuracion/razoncierre');
        } catch (error) {
            if (error.response.status == 400) {
                var claves = Object.keys(error.response.data);
                var firstValue = error.response.data[claves[0]];
                dispatch(onSendErrorMessage(firstValue[0]))
            } else {
                dispatch(onSendServerErrorMessage(error.response.data.error))
            }
        }
    }

    const startDeletingClient = async () => {
        // Todo: Llegar al backend
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
    }

    const startClearMessage = () => {
        dispatch(onClearMessage());
    }

    const startConfirmDelete = () => {
        dispatch(onConfirmDelete());
    }

    return {
        /* Atributos */
        isLoading,
        active,
        reasons,
        confirm,
        errorMessage,
        serverMessage,

        /* Metodos */
        startonLoadingReasons,
        startSetActiveReason,
        startSavingReason,
        startClearMessage,
    }
}
