const { User } = require('../../models/user.schema');
const { StatusCodes } = require("http-status-codes");


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

module.exports = { updateUserByAdminService };