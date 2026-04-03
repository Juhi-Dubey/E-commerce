const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId},
        process.env.JWT_SECRET,
        { expiresIn: "15m"},
    );
};


const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId},
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