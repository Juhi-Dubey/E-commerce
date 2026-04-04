const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

function validate(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = StatusCodes.BAD_REQUEST;
        error.details = errors.array(); 
        return next(error);
    }

    next();
}

module.exports = { validate };