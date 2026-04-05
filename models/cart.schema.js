const { Schema, model } = require("mongoose");
const {CART_ITEM_QUANTITY_MIN, CART_ITEM_QUANTITY_MAX} = require('../constants/cart.constant');


const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
            unique: true // one cart per user
        },

        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: CART_ITEM_QUANTITY_MIN,
                    max: CART_ITEM_QUANTITY_MAX
                },
                priceAtAdd: Number,
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Cart = model("Cart", cartSchema);

module.exports = { Cart };