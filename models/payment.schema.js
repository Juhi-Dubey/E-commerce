const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: Number,
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    }

}, { timestamps: true });

const Payment = model("Payment", paymentSchema);

module.exports = { Payment };