
const { Cart } = require("../../models/cart.schema");
const { Product } = require("../../models/product.schema");
const { StatusCodes } = require("http-status-codes");


const updateCartService = async (userId, productId, data) =>{
    const { quantity } = data;

    if (quantity <= 0) {
        const error = new Error("Invalid quantity");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    const cart = await Cart.findOne({ user: userId});

    if(!cart){
        const error = new Error("Cart not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
    );

    if(itemIndex === -1){
        const error = new Error("Product not in cart");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    const product = await Product.findById(productId);

    if(!product){
        const error = new Error("Product not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    if(quantity > product.stock){
        const error = new Error("Quantity exceeds stock");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    return cart;

}

module.exports = { updateCartService };