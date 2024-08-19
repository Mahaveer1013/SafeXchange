const { api } = require('./cjs/client/api.cjs');
const { encryptApi } = require('./cjs/client/encryptApi.cjs');
const { setClientConfig } = require('./cjs/client/config.cjs');
const { decryptRequest, encryptResponse } = require('./cjs/server/api.cjs');
const { setServerConfig } = require('./cjs/server/config.cjs');

module.exports = {
    decryptRequest,
    encryptResponse,
    setServerConfig,
    setClientConfig,
    encryptApi,
    api
};

