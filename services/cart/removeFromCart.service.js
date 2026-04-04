
const { Cart } = require("../../models/cart.schema");
const { StatusCodes } = require('http-status-codes');

const removeFromCartService = async (userId, productId) =>{
    const cart = await Cart.findOne({ user: userId });

    if(!cart){
        const error = new Error("Cart not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    const exists = cart.items.some(
        item => item.product.equals(productId)
    );

    if (!exists) {
        const error = new Error("Product not in cart");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    cart.items = cart.items.filter(
        item => !item.product.equals(productId)
    );

    if (cart.items.length === 0) {
        await cart.deleteOne();
        return {
            message: "Cart is now empty and deleted"
        };
    }

    await cart.save();

    return {
        message: "Item removed from cart",
        cart
    };


};


module.exports = { removeFromCartService };