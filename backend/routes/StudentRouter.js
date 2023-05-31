const StudentController = require("../Controllers/StudentController");
const isAuthenticatedUser = require("../middlewars/AuthMiddleware");

const StudentRouter = require("express").Router();
StudentRouter.get("/search/:options", StudentController.search)
StudentRouter.post("/attend/:course_id/:sec_id/:id", StudentController.addAttendance)
StudentRouter.put("/:id", StudentController.updateStudent)
StudentRouter.get("/attend/:course_id/:sec_id", StudentController.getMostCommitedStudents)
StudentRouter.get("/misthreeconsecutive", StudentController.getStudentsWhomiss3ConsecutiveLectures)
StudentRouter.get("/:dept_name/:course_id/:sec_id", StudentController.getStudents)
StudentRouter.get('/', StudentController.getAllStudents)
StudentRouter.post("/", StudentController.addStudent)
StudentRouter.delete("/:id", StudentController.deleteStudent)

module.exports = StudentRouter;