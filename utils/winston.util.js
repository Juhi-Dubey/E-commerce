const winston = require('winston');
const path = require('path');


const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.json()
    ),

    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),

        new winston.transports.File({
            filename: path.join(__dirname, '../../info.log'),
        }),

        new winston.transports.File({
            level: "error",
            filename: path.join(__dirname, '../../error.log'),
        }),
    ],
});


module.exports = { logger };