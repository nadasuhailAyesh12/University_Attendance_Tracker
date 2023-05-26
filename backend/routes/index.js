const db = require("../models/seeding/Connection");
const AuthRouter = require("./AuthRouter");
const courseRouter = require("./CourseRouter");
const fileRouter = require("./FileRouter");
const instructorRouter = require("./InstructorRouter");
const sectionRouter = require("./SectionRouter");
const UserRouter = require("./UserRouter");
const lectureRouter = require("./lectureRouter");

const router = require("express").Router();

// router.get("/", async (req, res) => {
//     const users = await db.any("select * from users");
//     res.json({
//         message: "helloWorld",
//         users
//     })
// })

router.use("/auth", AuthRouter)
router.use("/student", UserRouter)
router.use('/course', courseRouter)
router.use('/section', sectionRouter)
router.use('/file', fileRouter)
router.use('/instructor', instructorRouter)
router.use('/lecture', lectureRouter)
module.exports = router;