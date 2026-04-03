const express = require('express');
const authRouter = express.Router();

const { registerController, loginController, updatePasswordController, logoutController, refreshTokenController } = require('../controllers/auth.controller');

const {registerUserValidator } = require('../validators/auth/registerUser.validator');
const {loginUserValidator } = require('../validators/auth/loginUser.validator');
const {updatePasswordValidator } = require('../validators/auth/updatePassword.validator');
const {refreshTokenValidator } = require('../validators/auth/refreshToken.validator');

const{ validate } = require('../middlewares/validate.middleware');
const { authenticate } = require('../middlewares/authenticate.middleware');

// Public routes
authRouter.post('/register', registerUserValidator, validate, registerController);
authRouter.post('/login', loginUserValidator, validate, loginController);
authRouter.post('/refresh-token', refreshTokenValidator, validate, refreshTokenController);


// Protected routes
authRouter.patch('/update-password', authenticate, updatePasswordValidator, validate, updatePasswordController);
authRouter.post('/logout', authenticate, refreshTokenValidator, validate, logoutController);


module.exports = {authRouter};