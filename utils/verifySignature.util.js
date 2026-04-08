
const crypto = require('crypto');

const verifySignature = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");
    
    if(expectedSignature !== razorpay_signature){
        const error = new Error("Invalid payment signature");
        error.statusCode = 400;
        throw error;
    }
};

module.exports = { verifySignature };