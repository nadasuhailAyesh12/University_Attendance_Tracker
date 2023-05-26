const courseRepository = require("../models/queries/CourseQuery");

const getCourses = async (req, res, next) => {
    try {
        const courses = await courseRepository.getCourses()

        res.status(200).json({
            success: true,
            courses
        });
    }
    catch (err) {
        return next(err);
    }
};

const addCourse = async (req, res, next) => {
    try {
        const { id, title, dept_name, book } = req.body
        await courseRepository.addCourse(id, title, dept_name, book)

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, dept_name, book, course_id } = req.body
        await courseRepository.updateCourse(id, title, dept_name, book, course_id);

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        await courseRepository.deleteCourse(id);

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};

const courseController = { getCourses, addCourse, updateCourse, deleteCourse };
module.exports = courseController;
