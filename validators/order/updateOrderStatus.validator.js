const { param, body } = require("express-validator");
const mongoose = require("mongoose");


const updateOrderStatusValidator = [
    param("id").custom(value =>{
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Invalid order ID");
        }
        return true;
    }),

    body("status")
        .isIn(["confirmed", "shipped", "delivered", "cancelled"])
        .withMessage("Invalid status")
];


module.exports = { updateOrderStatusValidator };