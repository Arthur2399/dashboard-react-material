import { useState } from "react";
import { morgquickApi } from "../../../../api";

export const useGetReports = () => {

    const [contractPrint, setContractPrint] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    const startGetContratPrint = async (idHeader) => {

        try {
            const { data } = await morgquickApi.get(`/subscriptions/Contracts_pdf/${idHeader}`);
            setContractPrint(data);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return {

        /* Atributos */
        contractPrint,
        isLoading,
        /* Metodos */
        startGetContratPrint,
    }
}
