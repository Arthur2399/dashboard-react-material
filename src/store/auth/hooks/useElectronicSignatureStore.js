import { useDispatch, useSelector } from "react-redux"
import { onConfirm, onIsLoadingElecSignature, onLoadUser, onSendErrorMessageElecSignature } from "../electronicSignatureSlice";

export const useElectronicSignatureStore = () => {
    const {
        isLoading,
        user,
        confirm,
        errorMessage,
        serverMessage } = useSelector(state => state.elecSignature);

    const dispatch = useDispatch();

    const startLoadUser = async (token) => {
        try {
            dispatch(onIsLoadingElecSignature())
            const response = await fetch('http://192.168.100.2:8084/makeurl/info', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await response.json();
            dispatch(onLoadUser(data))
            if (response.status == 401) {
                dispatch(onSendErrorMessageElecSignature("Lo sentimos, pero tu sesión expiró"));
            }
        } catch (error) {
        }
    }

    const startPostElectronicSignature = async (token, values) => {
        try {
            dispatch(onIsLoadingElecSignature())
            const response = await fetch('http://192.168.100.2:8084/makeurl/upload', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: values
            });
            const data = await response.json();
            dispatch(onConfirm());
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        /* Atributos */
        isLoading,
        user,
        confirm,
        errorMessage,
        serverMessage,

        /* Métodos */
        startLoadUser,
        startPostElectronicSignature,

    }
}
