const { Order } = require("../../models/order.schema");
const { StatusCodes } = require("http-status-codes");


const updateOrderStatusService = async (orderId, status, role) =>{

    if(role != "admin"){
        const error = new Error("Not authorized");
        error.statusCode = StatusCodes.FORBIDDEN;
        throw error;
    }

    const order = await Order.findById(orderId);

    if(!order){
        const error = new Error("Order not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    const allowedTransitions = {
        pending: ['confirmed', 'cancelled'],
        confirmed: ["shipped"],
        shipped: ['delivered'],
        delivered: [],
        cancelled: []
    };

    if(!allowedTransitions[order.status].includes(status)){
        const error = new Error(`Cannot change status from ${order.status} to ${status}`);
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    order.status = status;
    await order.save();

    return {
        message: "Order status updated succesfully",
        order
    };
};

module.exports = { updateOrderStatusService };
