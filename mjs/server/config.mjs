// config.js
let config = {
    jwtSecret: '',
    server: {
        requestLogs: false,
        responseLogs: false,
    },
};

const setServerConfig = (newConfig) => {
    config = { ...config, ...newConfig };
};

const getServerConfig = () => config;

export { setServerConfig, getServerConfig }