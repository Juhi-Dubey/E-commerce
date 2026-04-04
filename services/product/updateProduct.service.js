const { Product } = require('../../models/product.schema');
const { StatusCodes }  = require('http-status-codes');


const updateProductService = async (productId, userId, role, data) =>{
    const product = await Product.findById(productId);

    if(!product){
        const error = new Error("Product not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    if ( role !== "admin" && product.createdBy.toString() !== userId) {
        const error = new Error("Not authorized");
        error.statusCode = StatusCodes.FORBIDDEN;
        throw error;
    }

    const allowed = ["name", "description", "price", "stock", "category"];
    
    allowed.forEach(key => {
        if(data[key] !== undefined){
            product[key] = data[key];
        }
    });

    await product.save();

    return product;
}


module.exports = { updateProductService };