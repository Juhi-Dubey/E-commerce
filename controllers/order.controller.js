const { createOrderService } = require("../services/order/createOrder.service");
const { getOrdersService } = require("../services/order/getOrders.service");
const { getOrderByIdService } = require("../services/order/getOrderById.service");
const { cancelOrderService } = require('../services/order/cancelOrder.service');

const { StatusCodes } = require('http-status-codes');


const createOrderController = async (req, res, next) => {
    try {
        const result = await createOrderService(req.user.id);

        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
}


const getOrdersController = async (req, res, next) => {
    try {
        const result = await getOrdersService(
            req.user.id,
            req.user.role
        );
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}


const getOrderByIdController = async (req, res, next) =>{
    try {
        const result = await getOrderByIdService(
            req.params.id,
            req.user.id,
            req.user.role,
        );
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}


const cancelOrderController = async (req, res, next) =>{
    try {
        const result = await cancelOrderService(
            req.params.id,
            req.user.id,
            req.user.role
        );

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrderController,
    getOrdersController,
    getOrderByIdController,
    cancelOrderController,
};