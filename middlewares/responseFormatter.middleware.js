const { getReasonPhrase } = require('http-status-codes');

function responseFormatter(req, res, next) {
    const originalJson = res.json;

    res.json = (data) =>{
        const isSuccess = res.statusCode >= 200 && res.statusCode<300;

        const response ={
            status: isSuccess ? 'success' : 'error',
            statusCode: res.statusCode,
            message: getReasonPhrase(res.statusCode),
            data: isSuccess ? data : null,
            error: isSuccess ? null : data,
        };

        return originalJson.call(res, response);
    }
    next();
}

module.exports = { responseFormatter };