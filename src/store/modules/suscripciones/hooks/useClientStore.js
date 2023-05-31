import { useDispatch, useSelector } from "react-redux"
import { decryptData } from "../../../../hooks/useEncrypData";
import { onIsLoading, onLoadClients } from "../slices/clientSlice";
import morgquickApi from "../../../../api/morgquickApi";

export const useClientStore = () => {

    const {isLoading, clients, active, serverMessage, errorMessage} = useSelector(state=>state.client)
    const dispatch = useDispatch();
    
    const startonLoadingClients = async() =>{
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())

        try {
            const { data } = await morgquickApi.get(`/client/get/${decryptedData.id}`);
            dispatch(onLoadClients(data))
        } catch (error) {
            console.log(error)
        }

    }

  return {
    /* ATRIBUTOS */
    isLoading,
    clients,
    active,
    serverMessage,
    errorMessage,

    /* METODOS */
    startonLoadingClients
  }
}
