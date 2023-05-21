const db = require("../models/seeding/Connection");
const AuthRouter = require("./AuthRouter");
const UserRouter = require("./UserRouter");

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

module.exports = router;