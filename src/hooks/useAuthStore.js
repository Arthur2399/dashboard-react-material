import { useDispatch, useSelector } from "react-redux"
import { checkingCredentials } from "../store/auth/authSlice";
import morgquickApi from "../api/morgquickApi";

export const useAuthStore = () => {

    const { status, email, name, job, photoURL, token, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checkingCredentials())
        try {
            const { data } = await morgquickApi.post('/authMorg/auth/login', { email, password });
            console.log(data)
        } catch (error) {
            console.log(error);

        }

    }

    return {
        // Propiedades
        status,
        email,
        name,
        job,
        photoURL,
        token,
        errorMessage,

        // Metodos
        startLogin
    }
}
