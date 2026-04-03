const { User } = require('../../models/user.schema');
const {generateAccessToken, generateRefreshToken, verifyRefreshToken} = require('../../providers/auth/token.provider');
const { hashPassword, comparePassword } = require("../../providers/auth/bcrypt.provider");



const createInvalidTokenError = () => {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    return error;
}


const refreshTokenService = async (token) =>{
    if(!token){
        const error = new Error("Refresh token required");
        error.statusCode = 401;
        throw error;
    }

    let decoded;
    try {
        decoded = verifyRefreshToken(token);
    } catch (err) {
        throw createInvalidTokenError();
    }

    const user = await User.findById(decoded.id);

    if(!user || !user.refreshToken){
        throw createInvalidTokenError();
    }

    const isValid = await comparePassword(token, user.refreshToken);

    if(!isValid) {
        throw createInvalidTokenError();
    }

    
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    const hashedToken = await hashPassword(newRefreshToken);
    user.refreshToken = hashedToken;
    await user.save();


    return{
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};

module.exports = {
    refreshTokenService
};