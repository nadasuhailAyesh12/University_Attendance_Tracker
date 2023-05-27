const departmentController = require('../Controllers/departmentController');

const departmentRouter = require('express').Router();

departmentRouter.get('/', departmentController.getdepartments)

module.exports = departmentRouter;