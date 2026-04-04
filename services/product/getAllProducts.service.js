const { Product } = require('../../models/product.schema');

const getAllProductsService = async (query) =>{
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1)*limit;

    const filter = {};

    if(query.category){
        filter.category = query.category;
    }

    const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    

    return {
        page, 
        limit, 
        count: products.length,
        data: products
    };
}

module.exports = { getAllProductsService };