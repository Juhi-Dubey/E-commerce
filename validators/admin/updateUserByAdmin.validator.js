const { param, body } = require("express-validator");
const mongoose = require("mongoose");
const { NAME_MAX_LENGTH } = require("../../constants/user.constant");



const updateUserByAdminValidator = [
  param("id").custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("Invalid user ID");
    }
    return true;
  }),

  body("firstName")
    .optional()
    .isString()
    .isLength({ max: NAME_MAX_LENGTH }),

  body("lastName")
    .optional()
    .isString()
    .isLength({ max: NAME_MAX_LENGTH }),

  body("role")
    .optional()
    .isIn(["user", "admin"])
];

module.exports = { updateUserByAdminValidator };