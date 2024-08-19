const CryptoJS = require('crypto-js');
const { getServerConfig } = require('./config.cjs');

// Middleware to decrypt request data
const decryptRequest = (req, res, next) => {
    if (req.is('application/octet-stream')) {
        let data = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                if (getServerConfig().server.requestLogs) {
                    console.log('Before request decryption \n', data);
                }
                const decryptedBytes = CryptoJS.AES.decrypt(data, getServerConfig().jwtSecret);
                const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
                req.body = JSON.parse(decryptedText);
                if (getServerConfig().server.requestLogs) {
                    console.log('After request decryption \n', JSON.parse(decryptedText));
                }
                next();
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: 'Failed to decrypt the value or it might not be encrypted.',
                });
            }
        });
    } else {
        next();
    }
};

// Middleware to encrypt response data
const encryptResponse = (req, res, next) => {
    const originalSend = res.send;
    
    res.send = async function (body) {
        if (!req.enc && req.is('application/octet-stream')) {
            if (getServerConfig().server.responseLogs) {
                console.log('Before response encryption \n', body);
            }
            try {
                if (body !== null) {
                    try {
                        body = await CryptoJS.AES.encrypt(body, getServerConfig().jwtSecret).toString();
                        if (getServerConfig().server.responseLogs) {
                            console.log('After response encryption \n', body);
                        }
                    } catch (error) {
                        console.error('Error during value encryption:', error);
                        throw new Error('Encryption failed');
                    }
                }
                req.enc = true;
            } catch (error) {
                console.error('Error during response encryption:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
        return originalSend.call(this, body);
    };

    next();
};

module.exports = { encryptResponse, decryptRequest };