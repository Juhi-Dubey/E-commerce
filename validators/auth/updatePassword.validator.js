const { body } = require("express-validator");

const updatePasswordValidator = [
    body('oldPassword')
        .notEmpty().withMessage("Old password is required"),

    body("newPassword")
        .notEmpty().withMessage('Password is required')
        .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage("Password must include at least one digit, one uppercase character, one lowercase character, and one special character")
        .isLength({min: 8}).withMessage("Password must be 8 characters long"),
    
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
