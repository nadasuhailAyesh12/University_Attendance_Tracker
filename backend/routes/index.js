const AuthRouter = require("./AuthRouter");
const courseRouter = require("./CourseRouter");
const fileRouter = require("./FileRouter");
const instructorRouter = require("./InstructorRouter");
const sectionRouter = require("./SectionRouter");
const lectureRouter = require("./lectureRouter");
const departmentRouter = require("./departmentRouter");
const StudentRouter = require("./StudentRouter");
const router = require("express").Router();

router.use("/auth", AuthRouter)
router.use("/student", StudentRouter)
router.use('/course', courseRouter)
router.use('/section', sectionRouter)
router.use('/file', fileRouter)
router.use('/instructor', instructorRouter)
router.use('/lecture', lectureRouter)
router.use('/department', departmentRouter)

module.exports = router;