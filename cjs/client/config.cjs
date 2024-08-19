// config.js
let config = {
    jwtSecret: '',
    client: {
        requestLogs: false,
        responseLogs: false,
        withCredentials: false,
    },
};

const setClientConfig = (newConfig) => {
    config = { ...config, ...newConfig };
};

const getClientConfig = () => config;

module.exports = { setClientConfig, getClientConfig }