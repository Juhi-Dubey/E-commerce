const { StatusCodes } = require('http-status-codes');


function authorize(...roles) {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            const error = new Error("Forbidden");
            error.statusCode = StatusCodes.FORBIDDEN;
            return next(error);
        }
        next();
    }
}

module.exports = { authorize };