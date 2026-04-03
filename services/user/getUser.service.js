const { User } = require('../../models/user.schema');
const { StatusCodes } = require('http-status-codes');


const getProfileService = async (userId) =>{
    const user = await User.findById(userId).select('-password');

    if(!user){
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    return user;
}

module.exports = { getProfileService };