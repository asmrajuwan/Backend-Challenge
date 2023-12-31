const express = require("express");

const {
    processRegister,
    handleLogin,
    handleLogout,
} = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);
authRouter.post("/process-register", isLoggedOut, processRegister);

module.exports = authRouter;
