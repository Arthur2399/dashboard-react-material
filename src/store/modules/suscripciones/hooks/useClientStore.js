import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { decryptData } from "../../../../hooks/useEncrypData";
import morgquickApi from "../../../../api/morgquickApi";
import { clearMessage, onAddNewClient, onIsLoading, onLoadClients, onSetActiveClient, onUpdateClient, sendErrorMessage, sendServerErrorMessage } from "../slices/clientSlice";

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
    dispatch(clearMessage());
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
    startSavingClient,
    startClearMessage
  }
}
