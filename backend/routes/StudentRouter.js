const StudentController = require("../Controllers/StudentController");
const isAuthenticatedUser = require("../middlewars/AuthMiddleware");

const StudentRouter = require("express").Router();

StudentRouter.get("/Id/:id", StudentController.searchByID)
StudentRouter.get("/name/:name", StudentController.searchByName)
StudentRouter.get("/phone/:phone", StudentController.searchByPhone)
StudentRouter.post("/attend/:id", StudentController.addAttendance)
StudentRouter.put("/:id", StudentController.updateStudent)
StudentRouter.get("/:dept_name/:course_id/:sec_id", StudentController.getStudents)
// UserRouter.post("/", StudentController.d)
module.exports = StudentRouter;