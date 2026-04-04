const { param } = require("express-validator");


const productParamValidator = [
    param("productId")
        .isMongoId().withMessage("Invalid Product ID")
];

module.exports = { productParamValidator };