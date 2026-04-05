const mongoose = require("mongoose");
const { Order } = require("../../models/order.schema");
const { Product } = require("../../models/product.schema");


const cancelOrderService = async (orderId, userId, role) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const order = await Order.findById(orderId).session(session);

        if(!order){
            throw new Error("Order not found");
        }

        if(role !== "admin" && order.user.toString() !== userId){
            throw new Error("Not authorized");
        }

        if(["shipped", "delivered"].includes(order.status)){
            throw new Error("Cannot cancel this order");
        }

        if(order.status === "cancelled"){
            throw new Error("Order already cancelled");
        }

        for(const item of order.items){
            const product = await Product.findById(item.product).session(session);

            if(product){
                product.stock += item.quantity;
                await product.save({ session });
            }
        }

        order.status = 'cancelled';
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        return {
            message: "Order cancelled successfully"
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


module.exports = { cancelOrderService };