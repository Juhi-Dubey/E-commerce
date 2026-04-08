const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


const createPaymentService = async (order) =>{
    const options = {
        amount: order.totalAmount * 100, // paisa
        currency: "INR",
        receipt: `order_${order._id}`
    }

    const paymentOrder = await razorpay.orders.create(options);
    return paymentOrder;
};

module.exports = { createPaymentService };

