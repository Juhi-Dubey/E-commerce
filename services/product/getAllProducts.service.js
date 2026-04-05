
const { Product } = require('../../models/product.schema');
const { getCache } = require('../../utils/cache.util');


const getAllProductsService = async (query) =>{
    const cache = getCache();

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1)*limit;
    
    const key = JSON.stringify({
        page, 
        limit,
        category: query.category || null
    });

    if(cache[key]){
        return cache[key];
    }

    const filter = {};

    if(query.category){
        filter.category = query.category.toLowerCase();
    }

    const total = await Product.countDocuments({ ...filter, isDeleted: false });

    const products = await Product.find({ ...filter, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    

    const result = {
        page, 
        limit, 
        total,
        totalPages: Math.ceil(total/limit),
        data: products
    };

    cache[key] = result;
    setTimeout(() => delete cache[key], 60000);

    return result;
    
}

module.exports = { getAllProductsService };