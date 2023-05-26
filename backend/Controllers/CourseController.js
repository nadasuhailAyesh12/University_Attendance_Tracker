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

const courseController = { getCourses, addCourse };
module.exports = courseController;
