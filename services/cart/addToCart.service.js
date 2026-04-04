const { Cart } = require('../../models/cart.schema');
const { Product } = require("../../models/product.schema");
const mongoose = require("mongoose");



const addToCartService = async (userId, data) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { productId, quantity } = data;

        const product = await Product.findById(productId).session(session);

        if (!product) throw new Error("Product not found");

        if (quantity > product.stock) {
            throw new Error("Not enough stock");
        }

        
        await product.save({ session });

        let cart = await Cart.findOne({ user: userId }).session(session);

        if (!cart) {
            cart = await Cart.create([{
                user: userId,
                items: [{ product: productId, quantity }]
            }], { session });

            await session.commitTransaction();
            return cart[0];
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity
            });
        }


        await session.commitTransaction();
        return cart;

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};


module.exports = { addToCartService };