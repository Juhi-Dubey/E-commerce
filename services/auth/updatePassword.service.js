const { User } = require('../../models/user.schema');
const {hashPassword, comparePassword} = require('../../providers/auth/bcrypt.provider');


const updatePasswordService = async (userId, data) =>{
    console.log("USER ID:", userId);
    
    const { oldPassword, newPassword } = data;

    const user = await User.findById(userId).select("+password");

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const isMatch = await comparePassword(oldPassword, user.password);
    if(!isMatch){
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    user.refreshToken = null;
    
    await user.save();

    return{
        message: "Password updated successfully"
    };
};


module.exports = {
    updatePasswordService,
}