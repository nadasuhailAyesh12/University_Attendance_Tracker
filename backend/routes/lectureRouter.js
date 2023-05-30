const lectureController = require('../Controllers/LectureController');
const lectureRouter = require('express').Router();

lectureRouter.get('/search/:course_id/:dept_name/:options', lectureController.searchLecture)
lectureRouter.get('/attendanceStatus/:course_id/:sec_id', lectureController.AttendanceStatus)
lectureRouter.get('/missed/:course_id/:sec_id', lectureController.getLectureThatHavemoremissedthanattended)
lectureRouter.get('/:dept_name/:course_id', lectureController.getLectures)
lectureRouter.post('/', lectureController.insertLecture)
lectureRouter.put('/:id/:oldCourse_id/:oldSec_id', lectureController.updateLecture)
lectureRouter.delete('/:id/:course_id/:sec_id', lectureController.deleteLecture)

module.exports = lectureRouter