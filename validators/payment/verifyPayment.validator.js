const { body } = require('express-validator');

const verifyPaymentValidator = [
    body("razorpay_order_id").notEmpty().withMessage("Razorpay order ID is required"),
    body("razorpay_payment_id").notEmpty().withMessage("Razorpay payment ID is required"),
    body("razorpay_signature").notEmpty().withMessage("Razorpay signature is required"),
    body("orderId").isMongoId().withMessage("Invalid order ID")
        .notEmpty().withMessage("Order ID is required"),
];


module.exports = { verifyPaymentValidator };