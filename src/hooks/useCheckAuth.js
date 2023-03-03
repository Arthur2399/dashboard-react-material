import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import config from "../config";


export const useCheckAuth = () => {
    const { status, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    //Cuando recargas pierdes toda la informacion por lo que debes volver a envar al login 
    // necesitar verificar si hay un token en el navegador 
    // si el token ya es invalido borralo y bota al usuario

    
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
