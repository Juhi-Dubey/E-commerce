const {body} = require('express-validator');

const {
    NAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_REGEX
} = require('../../constants/user.constant');



const registerUserValidator = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("First name should be a string")
        .isLength({max: NAME_MAX_LENGTH}).withMessage("Max 100 characters allowed")
        .trim(),   
    
    body("lastName")
        .optional()
        .isString().withMessage("Last name must be a string")
        .isLength({max: NAME_MAX_LENGTH}).withMessage("Max 100 characters allowed")
        .trim(),
    
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email")
        .isLength({max: EMAIL_MAX_LENGTH}).withMessage("Max 200 characters allowed")
        .normalizeEmail(),
    
    body("password")
        .notEmpty().withMessage('Password is required')
        .matches(PASSWORD_REGEX).withMessage("Password must include at least one digit, one uppercase character, one lowercase character, and one special character")
        .isLength({min:  PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH}).withMessage("Password must be 8 characters long"),
        
        

];

module.exports = {registerUserValidator};