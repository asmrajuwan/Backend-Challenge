const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { mongoose } = require("mongoose");




const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ],
        };

        const options = { password: 0 };

        const users = await User.find(filter, options);

        if (!users || users.length === 0)
            throw createError(404, "no users found");

        return successResponse(res, {
            statusCode: 200,
            message: "users were returned",
            payload: {
                users: users,
            },
        });
    } catch (error) {
        next(error);
    }
};
const getUserById = async (req, res, next) => {
    try {
        console.log(req.user)
        const id = req.params.id;
        const options = { password: 0 };

        const user = await User.findById(id, options);

        if (!user) throw createError(404, "user is not found");

        return successResponse(res, {
            statusCode: 200,
            message: "user is returned",
            payload: { user },
        });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(createError(400, "invalid user id"));
        }

        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };

        const user = await User.findById(id, options);
        if (!user) throw createError(404, "user is not found");

        await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });

        return successResponse(res, {
            statusCode: 200,
            message: "user is deleted",
        });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(createError(400, "invalid user id"));
        }
        next(error);
    }
};

module.exports = { getUsers, getUserById, deleteUserById };
