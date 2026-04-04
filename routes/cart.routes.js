const express = require('express');
const cartRouter = express.Router();

const { authenticate } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validate.middleware.js');
const { productParamValidator } = require('../validators/cart/productParam.validator.js');
const { addToCartValidator } = require('../validators/cart/addToCart.validator');
const { updateCartValidator } = require('../validators/cart/updateCart.validator.js');
const {  addToCartController,
    getCartController,
    removeFromCartController,
    updateCartController,
    clearCartController
} = require("../controllers/cart.controller.js");


cartRouter.post('/', authenticate, addToCartValidator, validate, addToCartController);
cartRouter.get('/', authenticate, getCartController);
cartRouter.patch('/:productId', authenticate, productParamValidator, updateCartValidator, validate, updateCartController);
cartRouter.delete('/:productId', authenticate, productParamValidator, validate, removeFromCartController);
cartRouter.delete('/', authenticate, clearCartController);


module.exports = { cartRouter };