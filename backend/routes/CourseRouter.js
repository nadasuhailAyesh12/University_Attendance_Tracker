const courseController = require("../Controllers/CourseController");
const courseRouter = require('express').Router();

courseRouter.get('/', courseController.getCourses)
courseRouter.post('/', courseController.addCourse)
courseRouter.put('/:id', courseController.updateCourse)
courseRouter.delete('/:id', courseController.deleteCourse)

module.exports = courseRouter