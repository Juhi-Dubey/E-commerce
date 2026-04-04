const { Cart } = require("../../models/cart.schema");
const { StatusCodes } = require("http-status-codes");


const clearCartService = async (userId) =>{
    const cart = await Cart.findOne({ user: userId });

    if(!cart){
        const error = new Error("Cart not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error; 
    }

    await cart.deleteOne();

    return{
        message: "Cart cleared successfully"
    };
};


module.exports = { clearCartService };