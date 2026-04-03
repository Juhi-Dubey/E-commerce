const express = require('express');
const userRouter = express.Router();

const { authenticate } = require('../middlewares/authenticate.middleware');

const { getProfileController, updateUserController, deleteUserController } = require('../controllers/user.controller');


userRouter.get('/profile', authenticate, getProfileController);

userRouter.patch('/update', authenticate, updateUserController);

userRouter.delete('/delete', authenticate, deleteUserController);


module.exports = { userRouter };