const { User } = require('../../models/user.schema');


const getAllUsersService = async (query) =>{
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page -1) * limit;

    const total = await User.countDocuments();

    const users = await User.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

    return {
        page, 
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: users
    };
};


module.exports = { getAllUsersService };