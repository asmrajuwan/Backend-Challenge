const createError = require("http-errors");
const Course = require("../models/courseModel");
const { successResponse } = require("./responseController");

const createCourseController = async (req, res, next) => {
    try {
        const {
            name,
            description,
            price,
            duration,
            level,
            topics,
            schedule: { startDate, endDate, classDays, classTime },
        } = req.body;

        const courseExists = await Course.exists({ name: name });
        if (courseExists) {
            throw createError(409, "Course with this name is already exist");
        }

        const course = await Course.create({
            name,
            description,
            price,
            duration,
            level,
            topics,
            schedule: {
                startDate,
                endDate,
                classDays,
                classTime,
            },
        });

        return successResponse(res, {
            statusCode: 200,
            message: "The course has been added successfully",
            payload: course,
        });
    } catch (error) {
        next(error);
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;

        const searchRegExp = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [{ name: { $regex: searchRegExp } }],
        };
        const courses = await Course.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (!courses) throw createError(404, "no courses found");

        const count = await Course.find(filter).countDocuments();

        return successResponse(res, {
            statusCode: 200,
            message: "Courses returned successfully",
            payload: {
                courses: courses,
                pagination: {
                    totalpages: Math.ceil(count / limit),
                    currentPage: page,
                    previousPage: page - 1,
                    nextPage: page + 1,
                    totalNumberOfCourses: count,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
const getCourseById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);

        if (!course) {
            throw createError(404, "Course not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Returned single course",
            payload: course,
        });
    } catch (error) {
        next(error);
    }
};
const updateCourseById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedCourse) {
            throw createError(404, "Course not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "The course has been updated successfully",
            payload: updatedCourse,
        });
    } catch (error) {
        next(error);
    }
};
const deleteCourseById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            throw createError(404, "Course not found");
        }

        return successResponse(res, {
            statusCode: 200,
            message: "The course has been deleted successfully",
            payload: deletedCourse,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCourseController,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};
