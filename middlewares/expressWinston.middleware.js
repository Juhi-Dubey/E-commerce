const expressWinston = require("express-winston");
const { logger } = require("../utils/winston.util");

const expressWinstonLogger = expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: true,
    colorize: true,
});

module.exports = { expressWinstonLogger };