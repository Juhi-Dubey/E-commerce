const { body } = require("express-validator");

const {
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_REGEX
} = require('../../constants/user.constant');



const updatePasswordValidator = [
    body('oldPassword')
        .notEmpty().withMessage("Old password is required"),

    body("newPassword")
        .notEmpty().withMessage('Password is required')
        .matches(PASSWORD_REGEX).withMessage("Password must include at least one digit, one uppercase character, one lowercase character, and one special character")
        .isLength({min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH}).withMessage("Password must be 8 characters long"),
    
    body("confirmPassword")
        .notEmpty().withMessage('Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
];

module.exports = {updatePasswordValidator};
