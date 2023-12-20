const express = require("express");
const { router } = require("../app");
const {
    getUsers,
    getUserById,
    deleteUserById,
} = require("../controllers/userController");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

const userRouter = express.Router();

userRouter.get("/", isLoggedIn,isAdmin, getUsers);
userRouter.get("/:id", isLoggedIn, getUserById);
userRouter.delete("/:id", isLoggedIn, deleteUserById);

module.exports = userRouter;
