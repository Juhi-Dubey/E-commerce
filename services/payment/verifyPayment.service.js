
const { Payment } = require("../../models/payment.schema");
const { Order } = require("../../models/order.schema");
const { verifySignature } = require("../../utils/verifySignature.util");
const { StatusCodes } = require("http-status-codes");

const verifyPaymentService = async (userId, data) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    // Step 1: verify signature
    verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

    // Step 2: get order
    const order = await Order.findById(orderId);

    if (!order) {
        const error = new Error("Order not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    if (order.status === "confirmed") {
        throw new Error("Order already paid");
    }

    if (order.user.toString() !== userId) {
        const error = new Error("Not authorized");
        error.statusCode = StatusCodes.FORBIDDEN;
        throw error;
    }

    // Step 3: update order
    order.status = "confirmed";
    await order.save();

    // Step 4: save payment
    await Payment.create({
        user: userId,
        order: orderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amount: order.totalAmount,
        status: "paid"
    });

    return { message: "Payment verified successfully" };
};

module.exports = { verifyPaymentService };