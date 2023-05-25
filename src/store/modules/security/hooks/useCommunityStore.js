import { useDispatch, useSelector } from "react-redux";
import morgquickApi from "../../../../api/morgquickApi";
import { onLoadCommunities } from "../community/communitySlice";
import { decryptData } from "../../../../hooks/useEncrypData";

export const useCommunityStore = () => {

    const dispatch = useDispatch();
    const { isLoadingCommunity, comunities, active, serverMessage, errorMessage } = useSelector(state => state.community);

    const startLoadingCommunity = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        try {
            const { data } = await morgquickApi.get(`/security/comunity/get/${decryptedData.id}`);
            /* const events = convertEventsToDateEvents(data.eventos); */
            dispatch(onLoadCommunities(data));
        } catch (error) {
            console.log('Error cargando comunidades');
            console.log(error)
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

    }
}
