const express = require("express");
const adminRouter = express.Router();

const { authenticate } = require("../middlewares/authenticate.middleware");
const { authorize } = require("../middlewares/authorize.middleware");
const { validate } = require("../middlewares/validate.middleware");

const {
  getAllUsersController,
  getUserByIdController,
  updateUserByAdminController,
  deleteUserByAdminController
} = require("../controllers/adminUser.controller");

const { getAllUsersValidator } = require("../validators/admin/getAllUsers.validator");
const { getUserByIdValidator } = require("../validators/admin/getUserById.validator");
const { updateUserByAdminValidator } = require("../validators/admin/updateUserByAdmin.validator");
const { deleteUserByAdminValidator } = require("../validators/admin/deleteUserByAdmin.validator");


adminRouter.use(authenticate, authorize("admin"));

adminRouter.get("/users", getAllUsersValidator, validate, getAllUsersController);

adminRouter.get("/users/:id", getUserByIdValidator, validate, getUserByIdController);

adminRouter.patch("/users/:id", updateUserByAdminValidator, validate, updateUserByAdminController);

adminRouter.delete("/users/:id", deleteUserByAdminValidator, validate, deleteUserByAdminController);


module.exports = { adminRouter };