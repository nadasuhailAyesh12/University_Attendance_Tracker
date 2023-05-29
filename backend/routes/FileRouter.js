const csvFileController = require("../Controllers/CSVFilesController");
const fileRouter = require('express').Router();

fileRouter.get('/:course_id/:sec_id', csvFileController.exportStudentsWhoAttendLessthan25Percent)
fileRouter.post('/:course_id/:sec_id/:lecture_id', csvFileController.insertfromCsvFileToDatabase)

module.exports = fileRouter