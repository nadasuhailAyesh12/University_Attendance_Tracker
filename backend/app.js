const express = require("express")
const cookieParser = require("cookie-parser");

const router = require("./routes")
const app = express()

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router)

module.exports = app;
