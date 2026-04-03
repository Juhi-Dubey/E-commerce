const { User } = require('../../models/user.schema');
const { comparePassword, hashPassword } = require('../../providers/auth/bcrypt.provider');
const { generateAccessToken, generateRefreshToken } = require('../../providers/auth/token.provider');


const loginUserService = async (data) =>{
    const { email, password } = data;

    const user = await User.findOne({email}).select("+password");
    if(!user){
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch){
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedToken = await hashPassword(refreshToken);
    user.refreshToken = hashedToken;
    await user.save();

    return {
        user:{
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        accessToken,
        refreshToken
    };

};



module.exports = {
    loginUserService,
};