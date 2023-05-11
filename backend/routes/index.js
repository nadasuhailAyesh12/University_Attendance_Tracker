const db = require("../database/Connection");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const users = await db.any("select * from users");
    res.json({
        message: "helloWorld",
        users
    })
})

module.exports = router;