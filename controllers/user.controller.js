const { getProfileService } = require('../services/user/getUser.service');
const { updateUserService } = require('../services/user/updateUser.service');
const { deleteUserService } = require('../services/user/deleteUser.service');
const { StatusCodes } = require('http-status-codes');


const getProfileController = async (req, res, next) =>{
    try {
        const result = await getProfileService(req.user.id);

        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
};


const updateUserController = async (req, res, next) =>{
    try {
        const result = await updateUserService(
            req.user.id,
            req.body
        );

        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        next(error);
    }
};


const deleteUserController = async (req, res, next) => { 
    try { 
        await deleteUserService(req.user.id); 
        
        
        res.status(200).json({
            message: "User deleted successfully"
        }); 
        
    } catch (error) { 
        next(error); 
    } 
};


module.exports = { 
    getProfileController, 
    updateUserController, 
    deleteUserController 
};