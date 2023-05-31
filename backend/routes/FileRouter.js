const ExcelFilesController = require("../Controllers/ExcelFilesController");
const fileRouter = require('express').Router();

fileRouter.get('/dropped/:course_id/:sec_id', csvFileController.exportStudentsWhoAttendLessthan25Percent)
fileRouter.get('/updateStudentReport/:course_id/:sec_id/:id/:lecture_id', csvFileController.updateStudentReport)
fileRouter.post('/:course_id/:sec_id/:lecture_id', csvFileController.insertfromCsvFileToDatabase)
fileRouter.get('/studentReport/:id', csvFileController.exportAttendanceStatus)

module.exports = fileRouter