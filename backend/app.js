const express = require("express")
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewars/ErrorMiddleware")
const router = require("./routes")
const app = express()

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", router)
app.use(errorHandler)

module.exports = app;
