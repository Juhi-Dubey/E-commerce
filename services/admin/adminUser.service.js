const { User } = require('../../models/user.schema');
const { StatusCodes } = require("http-status-codes");


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


const getUserByIdService = async (userId) => {
    const user = await User.findById(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }
    return user;
}



const updateUserByAdminService  = async (userId, data) =>{
    const user = await User.findById(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    const allowed = ["firstName", "lastName", "role"];

    allowed.forEach(key => {
        if(data[key] !== undefined){
            user[key] = data[key];
        }
    });
    await user.save();

    return user;
}


const deleteUserByAdminService = async (userId) =>{
    const user = await User.findById(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    await User.findByIdAndDelete(userId);

    return {
        message: "User deleted successfully"
    };
};


module.exports = { 
    getAllUsersService,
    getUserByIdService,
    updateUserByAdminService ,
    deleteUserByAdminService
};