import CryptoJS from 'crypto-js';
import { getEnvironments } from '../helpers/getEnvironments';

const { VITE_SECRET_KEY } = getEnvironments();

export const encrypData = ( value ) => {
    console.log(VITE_SECRET_KEY)
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), VITE_SECRET_KEY).toString();
    return encryptedData;
}

export const decryptData = ( value ) => {
    const decryptedData = CryptoJS.AES.decrypt(value, VITE_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}