const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');


function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        const error = new Error("No token provided");
        error.statusCode = StatusCodes.UNAUTHORIZED;
        return next(error);
    }

    const token = authHeader.split(" ")[1];
    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { 
            id: decoded.id,
            role: decoded.role
        };
        next();

    } catch (err) {
        const error = new Error("Unauthorized");
        error.statusCode = StatusCodes.UNAUTHORIZED;
        return next(error);
    }
};


module.exports = { authenticate };