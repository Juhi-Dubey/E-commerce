const { User } = require('../../models/user.schema');
const { StatusCodes } = require('http-status-codes');

const deleteUserService = async (userId) =>{
    const user = await User.findByIdAndDelete(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }
    return {
        message: "User deleted successfully"
    };
}


module.exports = { deleteUserService };