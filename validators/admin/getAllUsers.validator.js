const { query } = require("express-validator");


const getAllUsersValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Invalid limit")
];

module.exports = { getAllUsersValidator };