const { User } = require('../../models/user.schema');
const { hashPassword } = require("../../providers/auth/bcrypt.provider")
const { generateAccessToken, generateRefreshToken } = require("../../providers/auth/token.provider");



const registerUserService = async (data) =>{
    const { firstName, lastName, email, password } = data;

    const existingUser = await User.findOne({ email });
    if(existingUser){
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        firstName,
        lastName, 
        email, 
        password: hashedPassword 
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedToken = await hashPassword(refreshToken);
    user.refreshToken = hashedToken;
    await user.save();

    return{
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


module.exports = { registerUserService };