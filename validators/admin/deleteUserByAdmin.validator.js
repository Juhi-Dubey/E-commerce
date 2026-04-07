const { param } = require("express-validator");
const mongoose = require("mongoose");


const deleteUserByAdminValidator = [
  param("id").custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("Invalid user ID");
    }
    return true;
  })
];

module.exports = { deleteUserByAdminValidator };