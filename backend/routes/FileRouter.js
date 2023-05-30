const ExcelFilesController = require("../Controllers/ExcelFilesController");
const fileRouter = require('express').Router();

fileRouter.get('/dropped/:course_id/:sec_id', ExcelFilesController.exportStudentsWhoAttendLessthan25Percent)
fileRouter.put('/studentReport/:course_id/:sec_id/:id/:lecture_id', ExcelFilesController.updateStudentReport)
fileRouter.post('/:course_id/:sec_id/:lecture_id', ExcelFilesController.insertfromExcelFileToDatabase)
fileRouter.get('/studentReport/:id', ExcelFilesController.exportAttendanceReport)

module.exports = fileRouter