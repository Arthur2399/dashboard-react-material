import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { decryptData } from "../../../../hooks";
import { morgquickApi } from "../../../../api";
import {
  clearMessage,
  onAddNewClient,
  onConfirmDelete,
  onIsLoading,
  onLoadClients,
  onSetActiveClient,
  onUpdateClient,
  sendErrorMessage,
  sendServerErrorMessage
} from "../slices/clientSlice";

export const useClientStore = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, clients, active, serverMessage, errorMessage, confirm } = useSelector(state => state.client);
  const [errorAtributes, setErrorAtributes] = useState([]);

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
        setErrorAtributes(error.response.data)
        var firstValue = error.response.data[claves[0]];
        dispatch(sendErrorMessage(`${firstValue[0]}`))

      } else {
        dispatch(sendServerErrorMessage(error.response.data.error))
      }
    }
  }

  const startDeletingClient = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }
  }

  const startClearMessage = () => {
    dispatch(clearMessage());
  }

  const startConfirmDelete = () => {
    dispatch(onConfirmDelete());
  }


  return {
    /* ATRIBUTOS */
    active,
    clients,
    confirm,
    errorAtributes,
    errorMessage,
    isLoading,
    serverMessage,

    /* METODOS */
    startClearMessage,
    startConfirmDelete,
    startDeletingClient,
    startonLoadingClients,
    startSavingClient,
    startSetActiveClient,
  }
}
