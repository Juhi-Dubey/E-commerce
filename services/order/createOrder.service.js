const mongoose = require('mongoose');
const { Cart } = require('../../models/cart.schema');
const { Order } = require('../../models/order.schema');
const { Product } = require('../../models/product.schema');


const createOrderService = async (userId) =>{
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product")
            .session(session);

        if(!cart || cart.items.length === 0){
            throw new Error("Cart is empty");
        }

        let totalAmount = 0;

        const orderItems = [];

        let priceChanged = false;

        for(const item of cart.items){
            const product = await Product.findOne({
                _id: item.product._id,
                isDeleted: false,
            }).session(session);

            if(!product){
                throw new Error("Product not found");
            }

            if(item.quantity > product.stock){
                throw new Error("Insufficient stock");
            }

            if(item.priceAtAdd !== product.price){
                priceChanged = true;
                item.priceAtAdd = product.price;
            }

            product.stock -= item.quantity;
            await product.save({ session });

            const itemTotal = item.priceAtAdd * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                price: item.priceAtAdd,
                quantity: item.quantity
            });
        }

        await cart.save({ session });
        const order = await Order.create(
            [
                {
                    user: userId,
                    items: orderItems,
                    totalAmount
                }
            ],
            { session }
        );

        await Cart.deleteOne({ user: userId }).session(session);

        await session.commitTransaction();
        session.endSession();

        return {
            order: order[0],
            message: priceChanged   
                ? "Some product prices were updated before placing the order"
                : "Order placed successfully"
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};


module.exports = { createOrderService };