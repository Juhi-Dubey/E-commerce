const { Product } = require('../../models/product.schema');


const createProductService = async (userId, data) =>{

    if (data.category) {
        data.category = data.category.toLowerCase().trim();
    }

    const product = await Product.create({
        ...data,
        createdBy: userId,
    });

    return product;
}


module.exports = { createProductService };