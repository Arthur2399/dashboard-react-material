import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { decryptData } from "../../../../hooks/useEncrypData";
import morgquickApi from "../../../../api/morgquickApi";
import { clearMessage, onAddNewPaymentTerm, onIsLoading, onLoadingPaymentTerm, onSetActivePaymentTerm, onUpdatePaymentTerm, sendErrorMessage, sendServerErrorMessage } from "../slices/paymentTermSlice";

export const usePaymentTermStore = () => {

    const { isLoading, paymenyTerms, confirm, active, errorMessage, serverMessage } = useSelector(state => state.paymentTerm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startonLoadingPaymentTerms = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())
        try {
          const { data } = await morgquickApi.get(`/tables/PaymentPlaces/get/${decryptedData.id}`);
          dispatch(onLoadingPaymentTerm(data))
        } catch (error) {
          console.log(error)
        }
      }
    
      const startSetActivePaymentTerm = (payment) => {
        dispatch(onSetActivePaymentTerm(payment));
      }
    
      const startSavingPaymentTerm = async (paymentData) => {
    
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...paymentData, company_id: decryptedData.id }
    
        dispatch(onIsLoading())
        try {
          if (paymentData.id) {
            // Actualizando
            await morgquickApi.put(`/tables/PaymentPlaces/update/${paymentData.id}`, values);
            dispatch(onUpdatePaymentTerm(values));
            navigate('/suscripciones/configuracion/plazospago');
            return;
          }
          // Creando
          await morgquickApi.post('/tables/PaymentPlaces/post', values);
          dispatch(onAddNewPaymentTerm(values));
          navigate('/suscripciones/configuracion/plazospago');
        } catch (error) {
          if (error.response.status == 400) {
            var claves = Object.keys(error.response.data);
            var firstValue = error.response.data[claves[0]];
            dispatch(sendServerErrorMessage(firstValue[0]))
          } else {
            dispatch(sendServerErrorMessage(error.response.data.error))
          }
        }
      }
    
      const startDeletingClient = async() => {
        // Todo: Llegar al backend
        try {
            await calendarApi.delete(`/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
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
        /* Atributos */
        isLoading,
        paymenyTerms,
        confirm,
        active,
        errorMessage,
        serverMessage,

        /* Metodos */
        startonLoadingPaymentTerms,
        startSetActivePaymentTerm,
        startClearMessage,
        startSavingPaymentTerm,
        startDeletingClient,
        startConfirmDelete

    }
}
