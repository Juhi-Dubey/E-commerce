const { Schema, model } = require('mongoose');


const {
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH
} = require('../constants/user.constant');



const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            maxLength: [NAME_MAX_LENGTH, `First name cannot exceed ${ NAME_MAX_LENGTH} characters`],
        },

        lastName: {
            type: String,
            trim: true,
            maxLength: [NAME_MAX_LENGTH, `Last name cannot exceed ${ NAME_MAX_LENGTH} characters`],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
            validate: {
                validator: function (email) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
                },
                message: "Please enter a valid email address",
            },
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`],
            select: false,
        },

        refreshToken: {
            type: String,
            default: null,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


//  Remove sensitive fields automatically
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
    },
});

const User = model("User", userSchema);

module.exports = { User };