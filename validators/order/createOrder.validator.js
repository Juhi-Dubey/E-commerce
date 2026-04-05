const { body } = require("express-validator");


const createOrderValidator = [
    body().custom((value, {req}) =>{
        if(!req.user?.id){
            throw new Error("Unauthorized");
        }
        return true;
    }),
]


module.exports = { createOrderValidator };