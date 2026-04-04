const { StatusCodes } = require('http-status-codes');

const { addToCartService } = require('../services/cart/addToCart.service');
const { getCartService } = require('../services/cart/getCart.service');
const { removeFromCartService } = require('../services/cart/removeFromCart.service');
const { updateCartService } = require('../services/cart/updateCart.service');
const { clearCartService } = require("../services/cart/clearCart.service");

const addToCartController = async (req, res, next) => {
    try {
        const result = await addToCartService(req.user.id, req.body);
        res.status(StatusCodes.OK).json({result})

    } catch (error) {
        next(error);
    }
}


const getCartController = async (req, res, next) => {
    try {
        const result = await getCartService(req.user.id);
        res.status(StatusCodes.OK).json({result})

    } catch (error) {
        next(error);
    }
}


const updateCartController = async (req, res, next) => {
    try {
        const result = await updateCartService(req.user.id, req.params.productId, req.body);
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
}


const removeFromCartController = async (req, res, next) => {
    try {
        const result = await removeFromCartService(req.user.id, req.params.productId);
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
}


const clearCartController = async (req, res, next) => {
    try {
        const result = await clearCartService(req.user.id);
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
}




module.exports = {
    addToCartController,
    getCartController,
    updateCartController,
    removeFromCartController,
    clearCartController
}