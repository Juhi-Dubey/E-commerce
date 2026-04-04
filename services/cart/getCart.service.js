const { Cart } = require('../../models/cart.schema');

const getCartService = async(userId) =>{
    const cart = await Cart.findOne({user: userId})
        .populate("items.product")
        .lean();
    
    if(!cart){
        return { items: []};
    }
    return cart;
};

module.exports = { getCartService };