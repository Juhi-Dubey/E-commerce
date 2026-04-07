const { User } = require('../../models/user.schema');
const { StatusCodes } = require("http-status-codes");


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


module.exports = { deleteUserByAdminService };