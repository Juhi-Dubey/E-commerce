const { Product } = require('../../models/product.schema');
const { StatusCodes }  = require('http-status-codes');
const { clearCache } = require('../../utils/cache.util');


const deleteProductService = async (productId, userId, role) =>{
    const product = await Product.findOne({
        _id: productId,
        isDeleted: false
    });

    if(!product){
        const error = new Error("Product not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    if ( role !== "admin" && product.createdBy.toString() !== userId ) {
        const error = new Error("Not authorized");
        error.statusCode = StatusCodes.FORBIDDEN;
        throw error;
    }

    product.isDeleted = true;
    await product.save();
    
    clearCache();

    return {
        message: "Product deleted successfully"
    };
};


module.exports = { deleteProductService };