import { useDispatch, useSelector } from "react-redux"
import { checkingCredentials, clearErrorMessage, login, logout } from "../store/auth/authSlice";
import morgquickApi from "../api/morgquickApi";

export const useAuthStore = () => {

    const { status, email, name, job, photoURL, token, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checkingCredentials())
        try {
            const { data } = await morgquickApi.post('/authMorg/auth/login', { email, password });
            sessionStorage.setItem("Token", data.token);
            dispatch(login({ email: data.email, job: data.job, name: data.name, photoURL: data.photoURL }))
            /* dispatch(startGetCompany()); */
        } catch (error) {
            dispatch(logout("Credenciales incorrectas."));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 5000);
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
