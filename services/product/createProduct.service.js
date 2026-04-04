const { Product } = require('../../models/product.schema');


const createProductService = async (userId, data) =>{
    const product = await Product.create({
        ...data,
        createdBy: userId,
    });

    return product;
}


module.exports = { createProductService };