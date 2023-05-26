const csvFileController = require("../Controllers/CSVFilesController");
const fileRouter = require('express').Router();

// fileRouter.get('/', csvFileController.exportToCsvFile)
fileRouter.post('/:id', csvFileController.insertfromCsvFileToDatabase)

module.exports = fileRouter