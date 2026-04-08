const { createPaymentService } = require("../services/payment/createPayment.service");
const { verifyPaymentService } = require("../services/payment/verifyPayment.service");
const { StatusCodes } = require("http-status-codes");


const createOrderController = async (req, res, next) =>{
    try {
        const result = await createOrderService(req.user.id);
        const payment = await createPaymentService(result.order);
        
        res.status(StatusCodes.CREATED).json({
            ...result,
            payment
        });
    } catch (error) {
        console.log("Payment error: ", error);
        next(error);
    }
};


const verifyPaymentController = async (req, res, next) =>{
    try {
        const result = await verifyPaymentService(req.user.id, req.body);
        res.status(StatusCodes.OK).json(result);
    }
    catch (error) {
        next(error);
    }
};

module.exports = { createOrderController, verifyPaymentController };
