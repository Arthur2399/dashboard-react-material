import CryptoJS from 'crypto-js';


export const encrypData = ( value ) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), config.secretKey).toString();
    return encryptedData;
}

export const decryptData = ( value ) => {
    const decryptedData = CryptoJS.AES.decrypt(value, config.secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}