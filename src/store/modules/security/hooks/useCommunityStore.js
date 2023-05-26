import { useDispatch, useSelector } from "react-redux";
import morgquickApi from "../../../../api/morgquickApi";
import { decryptData } from "../../../../hooks/useEncrypData";
import { onAddNewCommunity, onIsLoading, onLoadCommunities, onSetActiveCommunity, onUpdateCommunity } from "../community/communitySlice";
import { useNavigate } from "react-router-dom";

export const useCommunityStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoadingCommunity, comunities, active, serverMessage, errorMessage } = useSelector(state => state.community);

    const startLoadingCommunity = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())
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

    const startSavingCommunity = async (communityData) => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = {...communityData,company_id: decryptedData.id}
        dispatch(onIsLoading())
        try {
            if (communityData.id) {
                // Actualizando
                await morgquickApi.put(`/security/comunity/update/${communityData.id}`, values);
                dispatch(onUpdateCommunity(values));
                navigate(-1);
                return;
            }
            // Creando
            await morgquickApi.post('/security/comunity/post', values);
            dispatch(onAddNewCommunity(values));
            navigate('/seguridad');


        } catch (error) {
            console.log(error);
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
