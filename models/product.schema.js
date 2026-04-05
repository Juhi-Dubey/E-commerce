const { Schema, model } = require("mongoose");
const {
    PRODUCT_NAME_MIN_LENGTH,
    PRODUCT_NAME_MAX_LENGTH,
    PRODUCT_DESC_MIN_LENGTH,
    PRODUCT_DESC_MAX_LENGTH,
    PRODUCT_PRICE_MIN,
    PRODUCT_PRICE_MAX,
    PRODUCT_STOCK_MIN,
    PRODUCT_STOCK_MAX,
    PRODUCT_CATEGORIES,
} = require("../constants/product.constant");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minLength: [PRODUCT_NAME_MIN_LENGTH, "Name too short"],
            maxLength: [PRODUCT_NAME_MAX_LENGTH, "Name too long"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minLength: [PRODUCT_DESC_MIN_LENGTH, "Description too short"],
            maxLength: [PRODUCT_DESC_MAX_LENGTH, "Description too long"],
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [PRODUCT_PRICE_MIN, "Price cannot be negative"],
            max: [PRODUCT_PRICE_MAX, "Price too high"],
        },

        stock: {
            type: Number,
            required: [true, "Stock is required"],
            min: [PRODUCT_STOCK_MIN, "Stock cannot be negative"],
            max: [PRODUCT_STOCK_MAX, "Stock too large"],
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: function() {
                return this.isNew;
            },
            trim: true,
            enum: PRODUCT_CATEGORIES,
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.index({ category: 1});
productSchema.index({ createdAt: -1});


const Product = model("Product", productSchema);

module.exports = { Product };