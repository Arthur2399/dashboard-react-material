import { useState } from "react";
import { morgquickApi } from "../../../../api";

export const useGetReports = () => {

    const [contractPrint, setContractPrint] = useState("");

    const startGetContratPrint = async (idHeader) => {

        try {
            const { data } = await morgquickApi.get(`/subscriptions/Contracts_pdf/${idHeader}`);
            setContractPrint(data);
        } catch (error) {
            console.log(error)
        }
    }

    return {

        /* Atributos */
        contractPrint,
        /* Metodos */
        startGetContratPrint,
    }
}
