import { useDispatch, useSelector } from "react-redux"
import { checkingCredentials, clearErrorMessage, login, logout } from "../store/auth/authSlice";
import morgquickApi from "../api/morgquickApi";
import { useCompanyInfoStore } from "../modules/hooks/useCompanyInfoStore";

export const useAuthStore = () => {

    const { status, email, name, job, photoURL, token, errorMessage } = useSelector(state => state.auth)
    const {startGetCompany} = useCompanyInfoStore();
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checkingCredentials())
        try {
            const { data } = await morgquickApi.post('/authMorg/auth/login', { email, password });
            sessionStorage.setItem("token", data.token);
            dispatch(login({ email: data.email, job: data.job, name: data.name, photoURL: data.photoURL }));
            dispatch(startGetCompany());
        } catch (error) {
            dispatch(logout("Credenciales incorrectas."));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 5000);
        }
    }

    const checkAuthToken = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return dispatch(logout());
        try {
            const { data } = await morgquickApi.get('/authMorg/auth/token');
            sessionStorage.setItem("token", data.token);
            dispatch(login({ email: data.email, job: data.job, name: data.name, photoURL: data.photoURL }));
        } catch (error) {
            localStorage.clear();
            dispatch(logout());
        }
    }

    const startLogout = () => {
        /*         
        localStorage.clear();
        sessionStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() ); 
        */
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
        startLogin,
        checkAuthToken,
        startLogout
    }
}
