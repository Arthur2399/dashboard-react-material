import { useDispatch, useSelector } from "react-redux"
import { onIsLoadingElecSignature, onLoadUser } from "../electronicSignatureSlice";

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

    }
}
