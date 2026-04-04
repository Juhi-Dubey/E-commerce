const { Product } = require('../../models/product.schema');
let cache = {};

const getAllProductsService = async (query) =>{
    const key = JSON.stringify(query);
    if(cache[key]){
        return cache[key];
    }

    const result = await actualLogin();
    cache[key] = result;
    setTimeout(() => delete cache[key], 60000);

    return result;

    
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
        total,
        totalPages: Math.ceil(total/limit),
        data: products
    };
}

module.exports = { getAllProductsService };