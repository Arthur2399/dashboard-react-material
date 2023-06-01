import { useEffect, useState } from "react";
import morgquickApi from "../../../../api/morgquickApi";
import { decryptData } from "../../../../hooks/useEncrypData";

export const useGetComboxBox = () => {

    const [typeIdentification, setTypeIdentification] = useState([])
    const [service, setService] = useState([])
    const [tax, setTaxes] = useState([])
    const startGetCountry = async () => {
        try {
            const { data } = await morgquickApi.get(`/client/IdentificationType/get`);
            setTypeIdentification(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetServices = async () => {
        const companyInfo = localStorage.getItem("Company");
        const decryptedData = JSON.parse(decryptData(companyInfo));
        try {
            const { data } = await morgquickApi.get(`/inventory/products/cbx/${decryptedData.id}`);
            setService(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetTaxes = async () => {
        try {
            const { data } = await morgquickApi.get(`/inventory_tables/cbx/VatRate`);
            setTaxes(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        startGetCountry();
        startGetServices();
        startGetTaxes();
    }, [])

  return {
    /* Atributos */
    service,
    tax,
    typeIdentification,

  }
}
