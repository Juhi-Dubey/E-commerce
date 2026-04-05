const express = require('express');
const orderRouter = express.Router();

const { authenticate } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validate.middleware');

const {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  cancelOrderController,
  updateOrderStatusController
} = require("../controllers/order.controller");

const { createOrderValidator } = require("../validators/order/createOrder.validator");
const { getOrdersValidator } = require("../validators/order/getOrders.validator");
const { getOrderByIdValidator } = require("../validators/order/getOrderById.validator");
const { cancelOrderValidator } = require("../validators/order/cancelOrder.validator");
const { updateOrderStatusValidator } = require("../validators/order/updateOrderStatus.validator");


orderRouter.post('/', authenticate, createOrderValidator, validate, createOrderController);

orderRouter.get('/', authenticate, getOrdersValidator, validate, getOrdersController);

orderRouter.get('/:id', authenticate, getOrderByIdValidator, validate, getOrderByIdController);

orderRouter.patch('/:id/cancel', authenticate, cancelOrderValidator, validate, cancelOrderController);

orderRouter.patch("/:id/status", authenticate, updateOrderStatusValidator, validate, updateOrderStatusController);


module.exports = { orderRouter };