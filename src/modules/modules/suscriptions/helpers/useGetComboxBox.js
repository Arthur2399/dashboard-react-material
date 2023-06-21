import { useEffect, useState } from "react";
import 
{ morgquickApi } from "../../../../api/morgquickApi";
import { decryptData } from "../../../../hooks/useEncrypData";

export const useGetComboxBox = () => {

    const [typeIdentification, setTypeIdentification] = useState([])
    const [service, setService] = useState([])
    const [serviceData, setServiceData] = useState(null)
    const [tax, setTaxes] = useState([])
    const [user, setUser] = useState([])
    const [payForm, setPayForm] = useState([])

    const companyInfo = localStorage.getItem("Company");
    const decryptedData = JSON.parse(decryptData(companyInfo));

    const startGetCountry = async () => {
        try {
            const { data } = await morgquickApi.get(`/client/IdentificationType/get`);
            setTypeIdentification(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetServices = async () => {

        try {
            const { data } = await morgquickApi.get(`/inventory/products/cbx/${decryptedData.id}`);
            setService(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetServicesData = async (id) => {
        try {
            const { data } = await morgquickApi.get(`/inventory/products/update/${id}`);
            setServiceData(data);
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

    const startGetClients = async () => {
        try {
            const { data } = await morgquickApi.get(`/client/cbx/${decryptedData.id}`);
            setUser(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetPayForm = async () => {
        try {
            const { data } = await morgquickApi.get(`/tables/cbx/PaymentPlaces/${decryptedData.id}`);
            setPayForm(data);
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
        serviceData,
        tax,
        typeIdentification,
        user,
        payForm,
        
        /* Metodos */
        startGetServicesData,
        startGetClients,
        startGetPayForm,

    }
}
