import axios from 'axios';
import { getEnvironments } from '../helpers/getEnvironments';

const { VITE_API_URL } = getEnvironments()


const morgquickApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores
/* morgquickApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

 */
export default morgquickApi;

