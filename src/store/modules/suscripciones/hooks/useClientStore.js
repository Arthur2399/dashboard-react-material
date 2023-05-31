import { useDispatch, useSelector } from "react-redux"
import { decryptData } from "../../../../hooks/useEncrypData";
import { onAddNewClient, onIsLoading, onLoadClients, onSetActiveClient, onUpdateClient } from "../slices/clientSlice";
import morgquickApi from "../../../../api/morgquickApi";
import { useNavigate } from "react-router-dom";

export const useClientStore = () => {

  const { isLoading, clients, active, serverMessage, errorMessage } = useSelector(state => state.client)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startonLoadingClients = async () => {
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

  const startSetActiveClient = (client) => {
    dispatch(onSetActiveClient(client));
  }

  const startSavingClient = async (clientData) => {

    const companyInfo = localStorage.getItem("Company");
    const decryptedData = JSON.parse(decryptData(companyInfo));
    const values = { ...clientData, company_id: decryptedData.id }

    dispatch(onIsLoading())
    try {
      if (clientData.id) {
        // Actualizando
        await morgquickApi.put(`/client/update/${clientData.id}`, values);
        dispatch(onUpdateClient(values));
        navigate('/suscripciones/clientes');
        return;
      }
      // Creando
      await morgquickApi.post('/client/post', values);
      dispatch(onAddNewClient(values));
      navigate('/suscripciones/clientes');
    } catch (error) {
      console.log(error);
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
    startonLoadingClients,
    startSetActiveClient,
    startSavingClient
  }
}
