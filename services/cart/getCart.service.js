const { Cart } = require('../../models/cart.schema');

const getCartService = async(userId) =>{
    const cart = await Cart.findOne({user: userId})
        .populate("items.product")
        .lean();
    
    if(!cart){
        return { items: []};
    }

    let total = 0;

    const items = cart.items.map(item =>{
        const price = item.priceAtAdd || item.product.price;
        const itemTotal = price * item.quantity;
        total += itemTotal;
        return { ...item, total: itemTotal };
    })
    return { ...cart, items, total };
};

module.exports = { getCartService };