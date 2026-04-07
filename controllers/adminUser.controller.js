const { StatusCodes } = require("http-status-codes");

const { getAllUsersService } = require("../services/admin/getAllUsers.service");
const { getUserByIdService } = require("../services/admin/getUserById.service");
const { updateUserByAdminService } = require("../services/admin/updateUserByAdmin.service");
const { deleteUserByAdminService } = require("../services/admin/deleteUserByAdmin.service");


const getAllUsersController = async (req, res, next) =>{
    try {
        const result = await getAllUsersService(req.query);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

const getUserByIdController = async (req, res, next) =>{
    try {
        const result = await getUserByIdService(req.params.id);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}



const updateUserByAdminController = async (req, res, next) =>{
    try {
        const result = await updateUserByAdminService(req.params.id, req.body);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}


const deleteUserByAdminController = async (req, res, next) =>{
    try {
        const result = await deleteUserByAdminService(req.params.id);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllUsersController,
    getUserByIdController,
    updateUserByAdminController,
    deleteUserByAdminController,
}