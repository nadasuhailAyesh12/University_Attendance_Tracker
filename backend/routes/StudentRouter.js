const StudentController = require("../Controllers/StudentController");
const isAuthenticatedUser = require("../middlewars/AuthMiddleware");

const StudentRouter = require("express").Router();
StudentRouter.get("/search/:options", StudentController.search)
StudentRouter.post("/attend/:course_id/:sec_id/:id", StudentController.addAttendance)
StudentRouter.put("/:id", StudentController.updateStudent)
StudentRouter.get("/:dept_name/:course_id/:sec_id", StudentController.getStudents)
StudentRouter.post("/", StudentController.addStudent)
module.exports = StudentRouter;