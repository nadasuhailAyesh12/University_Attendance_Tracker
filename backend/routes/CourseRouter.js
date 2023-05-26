const courseController = require("../Controllers/CourseController");
const courseRouter = require('express').Router();

courseRouter.get('/', courseController.getCourses)
courseRouter.post('/', courseController.addCourse)

module.exports = courseRouter