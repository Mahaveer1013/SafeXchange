const axios = require('axios');
const CryptoJS = require('crypto-js');
const { getClientConfig } = require('./config.cjs');

const encryptApi = axios.create({
    baseURL: '',
    withCredentials: false,
});

const encryptValue = (value) => {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(value), getClientConfig().jwtSecret).toString();
    } catch (error) {
        console.error('Error during value encryption:', error);
        throw error;
    }
};

const decryptValue = (encryptedValue) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, getClientConfig().jwtSecret);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedText) {
            throw new Error('Decryption failed or result is empty');
        }
        console.log(typeof decryptedText, typeof JSON.parse(decryptedText));

        return JSON.parse(decryptedText);
    } catch (error) {
        console.error('Error during decryption:', error);
        throw error;
    }
};

// Request interceptor to encrypt data
encryptApi.interceptors.request.use((request) => {
    if (request.data) {
        if (getClientConfig().client.requestLogs) {
            console.log('Before request encryption \n', request.data);
        }
        request.data = encryptValue(request.data);
        request.headers['Content-Type'] = 'application/octet-stream';
        if (getClientConfig().client.requestLogs) {
            console.log('After request encryption \n', request.data);
        }
    }
    return request;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to decrypt data
encryptApi.interceptors.response.use((response) => {
    if (response.data && response.enc) {
        if (getClientConfig().client.responseLogs) {
            console.log('Before response decryption \n', response.data);
        }
        response.data = decryptValue(response.data);
        if (getClientConfig().client.responseLogs) {
            console.log('After response decryption \n', response.data);
        }
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

module.exports = { encryptApi };
