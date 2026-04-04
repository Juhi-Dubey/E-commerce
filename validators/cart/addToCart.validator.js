const { body } = require('express-validator');
const { CART_ITEM_QUANTITY_MIN, CART_ITEM_QUANTITY_MAX } = require('../../constants/cart.constant');


const addToCartValidator = [
    body("productId")
        .notEmpty().withMessage("Product ID is required")
        .isMongoId().withMessage("Invalid Product ID"),
    
    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: CART_ITEM_QUANTITY_MIN, max: CART_ITEM_QUANTITY_MAX }).withMessage(`Quantity must be between ${CART_ITEM_QUANTITY_MIN} and ${CART_ITEM_QUANTITY_MAX}`)
];


module.exports = { addToCartValidator };