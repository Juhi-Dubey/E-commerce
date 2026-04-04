const {registerUserService} = require("../services/auth/registerUser.service.js");
const {loginUserService} = require("../services/auth/loginUser.service.js");
const {updatePasswordService} = require("../services/auth/updatePassword.service.js");
const {logoutUserService} = require("../services/auth/logoutUser.service.js");
const {refreshTokenService} = require("../services/auth/refreshToken.service.js");


const registerController = async(req, res, next) =>{
    try {
        const result = await registerUserService(req.body);

        res.status(200).json( result );
    
    } catch (error) {
        next(error);
    }
};


const loginController = async (req, res, next) =>{
    try {
        const result = await loginUserService(req.body);

        res.status(200).json( result );

    } catch (error) {
        next(error);
    }
};



const updatePasswordController = async (req, res, next) =>{
    
    try {
        const result = await updatePasswordService(
            req.user.id,
            req.body
        );
        res.status(200).json({
            message: result.message 
        });

    } catch (error) {
        next(error);
    }
};


const logoutController = async (req, res, next) =>{
    try {
        const result = await logoutUserService(
            req.user.id, 
            req.body.refreshToken
        );
        
        res.status(200).json({ 
            success: true, 
            message: result.message 
        }); 

    } catch (error) {
        next(error); 
    }
}

const refreshTokenController = async (req, res, next) =>{
    try {
        const result = await refreshTokenService(req.body.refreshToken);

        res.status(200).json( result );

    } catch (error) {
        next(error);
    }
};



module.exports = { 
    registerController, 
    loginController, 
    updatePasswordController, 
    logoutController, 
    refreshTokenController 
};