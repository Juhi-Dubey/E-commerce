const { Product } = require('../../models/product.schema');
const { StatusCodes }  = require('http-status-codes');

const getProductByIdService = async (productId) =>{
    const product = await Product.findById(productId);

    if(!product){
        const error = new Error("Product not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    return product;
};


module.exports = { getProductByIdService };