const csvFileController = require("../Controllers/CSVFilesController");
const fileRouter = require('express').Router();

fileRouter.get('/dropped/:course_id/:sec_id', csvFileController.exportStudentsWhoAttendLessthan25Percent)
fileRouter.put('/studentReport/:course_id/:sec_id/:id/:lecture_id', csvFileController.updateStudentReport)
fileRouter.post('/:course_id/:sec_id/:lecture_id', csvFileController.insertfromCsvFileToDatabase)
fileRouter.get('/studentReport/:id', csvFileController.exportAttendanceStatus)

module.exports = fileRouter