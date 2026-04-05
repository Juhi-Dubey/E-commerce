const { User } = require('../../models/user.schema');
const { Cart } = require('../../models/cart.schema');
const { StatusCodes } = require('http-status-codes');


const deleteUserService = async (userId) =>{
    const user = await User.findByIdAndDelete(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    await Cart.deleteOne({ user: userId });
    await User.findByIdAndDelete(userId);

    return {
        message: "User deleted successfully"
    };
}


module.exports = { deleteUserService };