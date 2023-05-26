const instructorController = require("../Controllers/InstructorController");
const instructorRouter = require('express').Router();

instructorRouter.get('/:name', instructorController.searchInstructor)
instructorRouter.get('/', instructorController.getInstructors)
instructorRouter.post('/', instructorController.addInstructor)
instructorRouter.put('/:id', instructorController.updateInstructor)
instructorRouter.delete('/:id', instructorController.deleteInstructor)

module.exports = instructorRouter;