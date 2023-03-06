import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import config from "../config";
import { login, logout } from "../store/auth/authSlice";


export const useCheckAuth = () => {
    const token = window.sessionStorage.getItem("Token");
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    // Cuando recargas pierdes toda la informacion por lo que debes volver a envar al login 
    // Necesitas verificar si hay un token en el navegador 
    // Si el token ya es invalido borralo y bota al usuario

/*     const data ={
        email:"arthurchavez2399@gmail.com",
        name: "Arthur Chavez",
        photoURL: "https://media.licdn.com/dms/image/C4D03AQHQoTGZX_e1JQ/profile-displayphoto-shrink_800_800/0/1625078434839?e=2147483647&v=beta&t=gU0sbNyH1tZIRR5Fp5kzcYemZyxlPCizSE8SZA26LAo",
        token: token,
    } */


    useEffect(() => {


        const verifyCredentials = async () => {
            if(!token) return dispatch(logout());
            const { data } = await axios.get(`${config.apiUrl}/usuarios/api-token-auth/verify`,{headers: {Authorization: token}})
            dispatch(login(data))
        }
        verifyCredentials();
    }, [])



    /*     useEffect(() => {
            axios.get(`${config.apiUrl}/`)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }, [])
     */

    return status;
}
