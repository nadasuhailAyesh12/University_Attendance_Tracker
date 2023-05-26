const path = require('path')

const express = require("express")
const cookieParser = require("cookie-parser");
const upload = require("express-fileupload")
const errorHandler = require("./middlewars/ErrorMiddleware")
const router = require("./routes")
const app = express()
const cors = require('cors')

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(upload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '..', './assets')
}))
app.use(cors())
app.use("/api/v1", router)
app.use(errorHandler)



module.exports = app;
