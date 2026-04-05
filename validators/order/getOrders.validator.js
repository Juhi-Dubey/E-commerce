const { query } = require('express-validator');


const getOrdersValidator = [
    query("page").optional().isInt({ min: 1}).withMessage("Invalid page"),
    query("limit").optional().isInt({ min:1, max: 100 }).withMessage("Invalid message"),
    query("status").optional().isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
        .withMessage("Invalid status"),
];

module.exports = { getOrdersValidator };