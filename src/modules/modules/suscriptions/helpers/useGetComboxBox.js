import { useEffect, useState } from "react";
import morgquickApi from "../../../../api/morgquickApi";

export const useGetComboxBox = () => {

    const [typeIdentification, setTypeIdentification] = useState([])
    const startGetCountry = async () => {
        try {
            const { data } = await morgquickApi.get(`/client/IdentificationType/get`);
            setTypeIdentification(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        startGetCountry();
    }, [])

  return {
    /* Atributos */
    typeIdentification,

  }
}
