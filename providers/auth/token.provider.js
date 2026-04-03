const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m"},
    );
};


const generateRefreshToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            role: user.role
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d"},
    );
};

const verifyRefreshToken = (token) =>{
    try {
        const decoded = jwt.verify(
            token, process.env.JWT_REFRESH_SECRET
        );
        return decoded;

    } catch (error) {
        throw new Error("Invalid or expired refresh token");
        
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
}