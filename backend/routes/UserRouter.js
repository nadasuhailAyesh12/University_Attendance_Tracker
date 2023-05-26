const userController = require("../Controllers/UserController");

const UserRouter = require("express").Router();

UserRouter.get("/Id/:id", userController.searchByID)
UserRouter.get("/name/:name", userController.searchByName)
UserRouter.get("/phone/:phone", userController.searchByPhone)
UserRouter.post("/attend/:id", userController.addAttendance)
UserRouter.put("/:id", userController.updateStudent)
UserRouter.post("/", userController.d)
module.exports = UserRouter;