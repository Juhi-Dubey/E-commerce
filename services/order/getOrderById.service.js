
const { Order } = require('../../models/order.schema');
const { StatusCodes } = require('http-status-codes');


const getOrderByIdService = async (orderId, userId, role) =>{
    const order = await Order.findById(orderId).populate("items.product");

    if(!order){
        const error = new Error("Order not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    if(role !== "admin" && order.user.toString() !== userId){
        const error = new Error("Not authorized");
        error.statusCode = StatusCodes.FORBIDDEN;
        throw error;
    }
    return order;
};


module.exports = { getOrderByIdService };