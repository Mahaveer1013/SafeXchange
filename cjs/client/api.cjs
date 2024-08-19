const axios = require('axios');
const { getClientConfig } = require('./config.cjs');

const api = axios.create({
    baseURL: '',
    withCredentials: false,
});

module.exports = { api };