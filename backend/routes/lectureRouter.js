const lectureController = require('../Controllers/LectureController');
const lectureRouter = require('express').Router();

lectureRouter.get('/search/:course_id/:dept_name/:options', lectureController.searchLecture)
lectureRouter.get('/:dept_name/:course_id', lectureController.getLectures)
// courseRouter.post('/', courseController.addCourse)
// courseRouter.put('/:id', courseController.updateCourse)
// courseRouter.delete('/:id', courseController.deleteCourse)

module.exports = lectureRouter