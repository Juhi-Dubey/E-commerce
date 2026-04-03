const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            maxLength: [100, "First name cannot exceed 100 characters"],
        },

        lastName: {
            type: String,
            trim: true,
            maxLength: [100, "Last name cannot exceed 100 characters"],
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
            minLength: [8, "Password must be at least 8 characters long"],
            select: false,
        },

        refreshToken: {
            type: String,
            default: null,
        },
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