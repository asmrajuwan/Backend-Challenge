const createError = require("http-errors");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse } = require("./responseController");
const { jwtAccessKey } = require("../secret");
const { hashPassword } = require("../helpers/authHelper");


const processRegister = async (req, res, next) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw createError(409, "user with this email already registered");
        }

        const user = await User.create({
            name,
            email,
            phone,
            address,
            password,
        });
        return successResponse(res, {
            statusCode: 200,
            message: "user registered successfully",
            payload: user,
        });
    } catch (error) {
        next(error);
    }
};

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
           throw createError(400, "email is required" );
        }
        if (!password) {
           throw createError(400,"password is required" );
        }
        const user = await User.findOne({ email });
        if (!user)
           throw createError(404, "User does not exist with this id.Please register first!")
                   
                
            
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return next(createError(401, "Wrong credentials!"));
        const token = jwt.sign({ user }, jwtAccessKey);
        const { password: pass, ...rest } = user._doc;
        res.cookie("accessToken", token, { httpOnly: true, maxAge: 600000 });

        return successResponse(res, {
            statusCode: 200,
            message: "user logged in successfully",
            payload: user,
        });
    } catch (error) {
        next(error);
    }
};

const handleLogout = (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        return successResponse(res, {
            statusCode: 200,
            message: "user logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};
 const handleForgotPassword = async (req, res,next) => {
    try {
        const {email,newPassword} =req.body;
        if (!email) {
            throw createError(400, "email is required" );
         }
         if (!newPassword) {
            throw createError(400,"new password is required" );
         }

        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "wrong email or answer",
            });
        }

        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashed });
        return successResponse(res, {
            statusCode: 200,
            message: "password reset successfully",
        });
    } catch (error) {
      next(error)
    }
};

module.exports = { processRegister, handleLogin, handleLogout ,handleForgotPassword};
