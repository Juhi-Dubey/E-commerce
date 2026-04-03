const { User } = require('../../models/user.schema');
const { StatusCodes } = require('http-status-codes');

async function updateUserService(userId, data) {
    const allowedFields = ["firstName", "lastName", "email"];
    const updates = {};

    Object.keys(data).forEach((key) => {
        if (allowedFields.includes(key)) {
            updates[key] = data[key];
        }
    });

    if (Object.keys(updates).length === 0) {
        const error = new Error("No valid fields to update");
        error.statusCode = StatusCodes.BAD_REQUEST;
        throw error;
    }

    if (updates.email) {
        const existingUser = await User.findOne({ email: updates.email });

        if (existingUser && existingUser._id.toString() !== userId) {
            const error = new Error("Email already in use");
            error.statusCode = StatusCodes.BAD_REQUEST;
            throw error;
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updates,
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
    }

    return user;
}

module.exports = { updateUserService };