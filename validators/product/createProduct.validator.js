const { body } = require("express-validator");
const {
    PRODUCT_NAME_MIN_LENGTH,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_DESC_MIN_LENGTH,
    PRODUCT_DESC_MAX_LENGTH,
    PRODUCT_PRICE_MIN,
    PRODUCT_PRICE_MAX,
    PRODUCT_STOCK_MIN,
    PRODUCT_STOCK_MAX,
    PRODUCT_CATEGORIES
} = require("../../constants/product.constant");



const createProductValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: PRODUCT_NAME_MIN_LENGTH, max: PRODUCT_NAME_MAX_LENGTH }),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: PRODUCT_DESC_MIN_LENGTH, max: PRODUCT_DESC_MAX_LENGTH }),

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: PRODUCT_PRICE_MIN, max: PRODUCT_PRICE_MAX }),

    body("stock")
        .notEmpty().withMessage("Stock is required")
        .isInt({ min: PRODUCT_STOCK_MIN, max: PRODUCT_STOCK_MAX }),
    
    body("category") 
        .notEmpty().withMessage("Category is required")
        .isIn(PRODUCT_CATEGORIES).withMessage("Invalid category")
];

module.exports = { createProductValidator };