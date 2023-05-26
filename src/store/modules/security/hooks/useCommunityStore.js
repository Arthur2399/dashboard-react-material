import { useDispatch, useSelector } from "react-redux";
import morgquickApi from "../../../../api/morgquickApi";
import { decryptData } from "../../../../hooks/useEncrypData";
import { onLoadCommunities, onSetActiveCommunity } from "../community/communitySlice";

export const useCommunityStore = () => {

    const dispatch = useDispatch();
    const { isLoadingCommunity, comunities, active, serverMessage, errorMessage } = useSelector(state => state.community);

    const startLoadingCommunity = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        try {
            const { data } = await morgquickApi.get(`/security/comunity/get/${decryptedData.id}`);
            dispatch(onLoadCommunities(data));
        } catch (error) {
            console.log('Error cargando comunidades');
            console.log(error)
        }
    }

    const startSetActiveCommunity = (community) => {
        dispatch(onSetActiveCommunity(community));
    }

    const startSavingCommunity = async (community) => {

        try {
            if (calendarEvent.id) {
                // Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }
    }


    return {
        /* Propiedades */
        isLoadingCommunity,
        comunities,
        active,
        serverMessage,
        errorMessage,

        /* Metodos */
        startLoadingCommunity,
        startSetActiveCommunity,
        startSavingCommunity,
    }
}
