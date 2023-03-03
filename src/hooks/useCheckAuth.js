import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import config from "../config";


export const useCheckAuth = () => {
    const { status, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
