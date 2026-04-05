const { Order } = require("../../models/order.schema");


const getOrdersService = async (userId, role, query) =>{
    let filter = {};

    if(role !== "admin"){
        filter.user = userId;
    }

    if (query.status) {
        filter.status = query.status;
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: orders
    };

}


module.exports = { getOrdersService };