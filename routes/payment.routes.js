const express = require('express');
const paymentRouter = express.Router();

const { authenticate } = require("../middlewares/authenticate.middleware");
const { validate } = require("../middlewares/validate.middleware");

const { verifyPaymentController } = require("../controllers/payment.controller");
const { verifyPaymentValidator } = require("../validators/payment/verifyPayment.validator");


paymentRouter.post("/verify", authenticate, verifyPaymentValidator, validate, verifyPaymentController);

module.exports = { paymentRouter };