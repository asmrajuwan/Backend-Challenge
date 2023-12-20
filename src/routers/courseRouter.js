const express = require("express");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");
const {
    createCourseController,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
} = require("../controllers/courseController");

const courseRouter = express.Router();

courseRouter.post(
    "/create-course",
    isLoggedIn,
    isAdmin,
    createCourseController
);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", isLoggedIn, isAdmin, getCourseById);
courseRouter.put("/:id", isLoggedIn, isAdmin, updateCourseById);
courseRouter.delete("/:id", isLoggedIn, isAdmin, deleteCourseById);

module.exports = courseRouter;
