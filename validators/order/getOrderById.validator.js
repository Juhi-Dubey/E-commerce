const { param } = require("express-validator");
const mongoose = require('mongoose');



const getOrderByIdValidator = [
    param("id").custom((value) =>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Invalid order ID");
        }
        return true;
    }),
];


module.exports = { getOrderByIdValidator };