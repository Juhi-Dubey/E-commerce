const { Product } = require('../../models/product.schema');
const { StatusCodes, FORBIDDEN }  = require('http-status-codes');


const deleteProductService = async (productId, userId, role) =>{
    const product = await Product.findById(productId);

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

    await product.deleteOne();

    return {
        message: "Product deleted successfully"
    };
};


module.exports = { deleteProductService };