const { body } = require('express-validator')


const {
    MAX_EMAIL_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} = require('../../constants/user.constant');


const loginUserValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email")
        .normalizeEmail() 
        .isLength({ max: MAX_EMAIL_LENGTH }).withMessage("Email cannot exceed 200 characters"),
    
        
    body("password")
        .notEmpty().withMessage('Password is required')
        .isString().withMessage("Password must be a string")
        .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH }).withMessage("Password must be between 8 and 128 characters"),
             
];


module.exports = { loginUserValidator };