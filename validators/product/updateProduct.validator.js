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
    PRODUCT_CATEGORIES,
} = require("../../constants/product.constant");



const updateProductValidator = [
    body("name")
        .optional()
        .isLength({ min: PRODUCT_NAME_MIN_LENGTH, max: PRODUCT_NAME_MAX_LENGTH }),

    body("description")
        .optional()
        .isLength({ min: PRODUCT_DESC_MIN_LENGTH, max: PRODUCT_DESC_MAX_LENGTH }),

    body("price")
        .optional()
        .isFloat({ min: PRODUCT_PRICE_MIN, max: PRODUCT_PRICE_MAX }),

    body("stock")
        .optional()
        .isInt({ min: PRODUCT_STOCK_MIN, max: PRODUCT_STOCK_MAX }),

    body("category")
        .optional()
        .isIn(PRODUCT_CATEGORIES)
];

module.exports = { updateProductValidator };