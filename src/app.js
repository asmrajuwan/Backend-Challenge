const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const bodyParser = require("body-parser");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");

const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routers/authRouter");
const courseRouter = require("./routers/courseRouter");

const app = express();



const keyGenerator = (req) => {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
};

const limiter = rateLimit({
    keyGenerator: keyGenerator,
    windowMs: 1 * 60 * 1000,
    max: 5, 
    message: "Too many requests, please try again later",
});
app.use(cookieParser());
app.use(limiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use("/api/auth",authRouter)
app.use("/api/course",courseRouter)

app.get("/", (req, res) => {
    res.status(200).send("welcome to the server");
});
//client error
app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});
//server error
app.use((err, req, res, next) => {
    return errorResponse(res, {
      statusCode: err.status,
      message: err.message,
    });
  });
module.exports = app;
