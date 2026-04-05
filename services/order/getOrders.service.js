const { Order } = require("../../models/order.schema");


const getOrdersService = async (userId, role) =>{
    let filter = {};

    if(role !== "admin"){
        filter.user = userId;
    }

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 });

    return orders;
}


module.exports = { getOrdersService };