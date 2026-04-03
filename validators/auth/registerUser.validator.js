const {body} = require('express-validator');

const registerUserValidator = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("First name should be a string")
        .isLength({max: 100}).withMessage("Max 100 characters allowed")
        .trim(),   
    
    body("lastName")
        .optional()
        .isString().withMessage("Last name must be a string")
        .isLength({max: 100}).withMessage("Max 100 characters allowed")
        .trim(),
    
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email")
        .isLength({max: 200}).withMessage("Max 200 characters allowed")
        .trim(),
    
    body("password")
        .notEmpty().withMessage('Password is required')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage("Password must include at least one digit, one uppercase character, one lowercase character, and one special character")
        .isLength({min: 8}).withMessage("Password must be 8 characters long"),
        
        

];

module.exports = {registerUserValidator};