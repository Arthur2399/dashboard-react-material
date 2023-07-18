import axios from 'axios';
import { getEnvironments } from '../helpers/getEnvironments';

const { VITE_API_URL } = getEnvironments();
console.log(VITE_API_URL)


export const morgquickApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores
morgquickApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token')
    }

    return config;
})
