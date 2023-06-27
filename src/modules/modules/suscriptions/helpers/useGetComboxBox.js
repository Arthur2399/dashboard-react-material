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
    const [plans, setPlans] = useState([])
    const [gender, setGender] = useState([])

    const [countries, setContries] = useState([])
    const [province, setProvince] = useState([])
    const [cantons, setCantons] = useState([])



    const companyInfo = localStorage.getItem("Company");
    const decryptedData = JSON.parse(decryptData(companyInfo));

    const startGetIdentificationType = async () => {
        try {
            const { data } = await morgquickApi.get(`/client/IdentificationType/get`);
            setTypeIdentification(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetGender = async () => {
        try {
            const { data } = await morgquickApi.get(`/tables/cbx/gender`);
            setGender(data);
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


    const startGetPlans = async () => {
        try {
            const { data } = await morgquickApi.get(`/plans/PlansHeader/cbx/${decryptedData.id}`);
            setPlans(data);
        } catch (error) {
            console.log(error)
        }
    }


    const startGetCountries = async () => {
        try {
            const { data } = await morgquickApi.get(`/tables/cbx/country`);
            setContries(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetProvince = async (idCountry) => {
        try {
            const { data } = await morgquickApi.get(`/tables/cbx/province/${idCountry}`);
            setProvince(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetCanton = async (idProvince) => {
        try {
            const { data } = await morgquickApi.get(`/tables/cbx/cantons/${idProvince}`);
            setCantons(data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        startGetServices();
        startGetTaxes();
    }, [])

    return {
        /* Atributos */
        cantons,
        countries,
        gender,
        payForm,
        plans,
        province,
        service,
        serviceData,
        tax,
        typeIdentification,
        user,
        
        /* Metodos */
        startGetCanton,
        startGetClients,
        startGetCountries,
        startGetGender,
        startGetIdentificationType,
        startGetPayForm,
        startGetPlans,
        startGetProvince,
        startGetServicesData,

    }
}
