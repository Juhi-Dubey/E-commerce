const { Product } = require('../../models/product.schema');
const { clearCache } = require('../../utils/cache.util');


const createProductService = async (userId, data) =>{

    if (data.category) {
        data.category = data.category.toLowerCase().trim();
    }

    const product = await Product.create({
        ...data,
        createdBy: userId,
    });
    clearCache();
    
    return product;
}


module.exports = { createProductService };