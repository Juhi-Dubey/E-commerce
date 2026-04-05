const { Cart } = require('../../models/cart.schema');
const { Product } = require("../../models/product.schema");
const mongoose = require("mongoose");



const addToCartService = async (userId, data) => {

    try {
        const { productId, quantity } = data;

        const product = await Product.findOne({
            _id: productId,
            isDeleted: false
        });

        if (!product) throw new Error("Product not found");

        if (quantity <= 0) {
            throw new Error("Invalid quantity");
        }

        if (quantity > product.stock) {
            throw new Error("Not enough stock");
        }


        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create([{
                user: userId,
                items: [{ product: productId, quantity, priceAtAdd: product.price }]
            }]);

            return cart[0];
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        const totalRequested = existingItem
            ? existingItem.quantity + quantity
            : quantity;

        if (totalRequested > product.stock) {
            throw new Error("Not enough stock available");
        }

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity
            });
        }

        await cart.save();
        return cart;

    } catch (err) {
        throw err;
    } 
};


module.exports = { addToCartService };