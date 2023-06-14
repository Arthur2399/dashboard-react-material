import { useDispatch, useSelector } from "react-redux"
import { clearMessage, onAddNew, onIsLoading, onLoad, onSetActive, onUpdate, sendErrorMessage, sendServerErrorMessage } from "../slices/servicesSlice";
import { decryptData } from "../../../../hooks/useEncrypData";
import morgquickApi from "../../../../api/morgquickApi";
import { useNavigate } from "react-router-dom";

export const useServicesStore = () => {

    const { isLoading, services, confirm, active, errorMessage, serverMessage } = useSelector(state => state.services);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const startonLoadingServices = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        dispatch(onIsLoading())
        try {
            const { data } = await morgquickApi.get(`/inventory/products/get/${decryptedData.id}`);
            dispatch(onLoad(data))
        } catch (error) {
            console.log(error)
        }
    }

    const startSetActiveService = (service) => {
        dispatch(onSetActive(service));
    }

    const startSavingService = async (service) => {

        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        const values = { ...service, company_id: decryptedData.id, tracking_id:3, detailed_type_id:2, image_upload:{"change":false},status:1  }

        dispatch(onIsLoading())
        try {
            if (service.id) {
                // Actualizando
                await morgquickApi.put(`/inventory/products/update/${service.id}`, values);
                dispatch(onUpdate(values));
                navigate('/suscripciones/configuracion/servicios');
                return;
            }
            // Creando
            await morgquickApi.post('/inventory/products/post', values);
            dispatch(onAddNew(values));
            navigate('/suscripciones/configuracion/servicios');
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

    const startConfirmDeleteService = () => {
        dispatch(onConfirmDelete());
    }


    return {
        /* Atributos */
        isLoading,
        services,
        confirm,
        active,
        errorMessage,
        serverMessage,

        /* Metodos */
        startonLoadingServices,
        startSetActiveService,
        startSavingService,
        startClearMessage,
        startConfirmDeleteService,

    }
}
