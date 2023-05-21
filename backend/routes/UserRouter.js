const userController = require("../Controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.get("/Id/:id", userController.searchByID)
UserRouter.get("/name/:name", userController.searchByName)
UserRouter.post("/attend", userController.addAttendance)
UserRouter.put("/:id", userController.updateStudent)
// UserRouter.get("/", userController.getStudents)
module.exports = UserRouter;