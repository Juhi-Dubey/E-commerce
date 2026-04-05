const { logger } = require("./winston.util");

function errorLogger(message, req, error) {
    logger.error(message, {
        errorMessage: error.message,
        errorStack: error.stack,
        errorName: error.name,
        errorCode: error.code || null,
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
    });
}

module.exports = { errorLogger };