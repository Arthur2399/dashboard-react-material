import { useState } from "react";
import 
{ morgquickApi } from "../../../../api/morgquickApi";
import { useEffect } from "react";

export const useGetComboBox = () => {

    const [country, setCountry] = useState([]);
    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);

    const startGetCountry = async () => {
        try {
            const { data } = await morgquickApi.get(`/security_tables/country/cbx`);
            setCountry(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startProvince = async (idCountry=58) => {
        try {
            const { data } = await morgquickApi.get(`/security_tables/province/cbx/${idCountry}`);
            setProvince(data);
        } catch (error) {
            console.log(error)
        }
    }

    const startGetCity = async (idProvince) => {
        try {
            const { data } = await morgquickApi.get(`/security_tables/cantons/cbx/${idProvince}`);
            setCity(data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        startGetCountry();
    }, [])

    return {
        /* Atributos */
        country,
        province,
        city,
        /* Metodos */
        startProvince,
        startGetCity,
    }
}
