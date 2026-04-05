const { User } = require('../../models/user.schema');
const { comparePassword } = require('../../providers/auth/bcrypt.provider');


const logoutUserService = async (userId, refreshToken) =>{
    const user = await User.findById(userId);

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
    }

    if (!refreshToken) {
        const error = new Error("Refresh token required");
        error.statusCode = 401;
        throw error;
    }
    

    if (!user.refreshToken) {
        const error = new Error("Already logged out");
        error.statusCode = 400;
        throw error;
    }

    const isValid = await comparePassword(refreshToken, user.refreshToken);

    if (!isValid) {
        const error = new Error("Invalid refresh token");
        error.statusCode = 401;
        throw error;
    }

    user.refreshToken = null;
    await user.save();

    return{
        message: "Logged out successfully"
    };
};


module.exports = {logoutUserService};